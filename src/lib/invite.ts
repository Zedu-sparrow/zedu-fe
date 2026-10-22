/**
 * "Invite your cohort" helpers.
 *
 * Each logged-in user gets a stable, unique invite code derived from their
 * user id + display name, which the backend can later persist and map.
 * The code is self-describing (decodeable) so the public /invite/[code]
 * landing page can show who sent the invite without extra API calls.
 */

export type InvitePayload = {
  /** Inviter's user id */
  u: string;
  /** Inviter's display name (username or full name) */
  n: string;
};

const B64URL_REPLACEMENTS: [RegExp, string][] = [
  [/\+/g, "-"],
  [/\//g, "_"],
  [/=+$/, ""],
];

function toBase64Url(input: string): string {
  let b64: string;
  if (typeof window !== "undefined" && typeof window.btoa !== "undefined") {
    b64 = window.btoa(
      encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } else {
    b64 = Buffer.from(input, "utf-8").toString("base64");
  }
  for (const [pattern, value] of B64URL_REPLACEMENTS) {
    b64 = b64.replace(pattern, value);
  }
  return b64;
}

function fromBase64Url(input: string): string {
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) b64 += "=";
  let decoded = "";
  try {
    if (typeof window !== "undefined" && typeof window.atob !== "undefined") {
      decoded = window.atob(b64);
    } else {
      decoded = Buffer.from(b64, "base64").toString("utf-8");
    }
  } catch {
    return "";
  }
  const bytes = decoded
    .split("")
    .map((c) => `${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`);
  try {
    return decodeURIComponent(bytes.map((b) => `%${b}`).join(""));
  } catch {
    return "";
  }
}

/** Small FNV-1a style checksum so malformed/tampered codes fail cleanly. */
function checksum(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0").slice(0, 8);
}

export function buildInvitePayload(user: {
  id?: string;
  user_id?: string;
  username?: string;
  full_name?: string;
}): InvitePayload | null {
  const userId = user?.id ?? user?.user_id ?? "";
  const name = (user?.username || user?.full_name || "").toString().trim();
  if (!userId) return null;
  return { u: userId, n: name };
}

/**
 * Unique, stable, per-user invite code: <base64url payload>-<checksum>.
 */
export function buildInviteCode(user: {
  id?: string;
  user_id?: string;
  username?: string;
  full_name?: string;
}): string | null {
  const payload = buildInvitePayload(user);
  if (!payload) return null;
  const encoded = toBase64Url(JSON.stringify(payload));
  return `${encoded}-${checksum(encoded)}`;
}

export function parseInviteCode(code: string): InvitePayload | null {
  const normalized = (code || "").trim();
  if (
    !normalized ||
    normalized.length > 512 ||
    !/^[A-Za-z0-9_-]+$/.test(normalized)
  ) {
    return null;
  }
  const separator = normalized.lastIndexOf("-");
  if (separator <= 0) return null;
  const encoded = normalized.slice(0, separator);
  const check = normalized.slice(separator + 1);
  if (checksum(encoded) !== check) return null;
  try {
    const payload = JSON.parse(fromBase64Url(encoded));
    if (payload && typeof payload.u === "string" && payload.u) {
      return {
        u: payload.u,
        n: typeof payload.n === "string" ? payload.n : "",
      };
    }
    return null;
  } catch {
    return null;
  }
}

export const DEFAULT_INVITE_MESSAGE = (link: string) =>
  `Join me on Zedu, where our class learns and chats in one place: ${link}`;

/**
 * Public share URL for a user's invite link, with UTM parameters so
 * analytics can attribute the invite channel.
 */
export function buildInviteLink(
  user: {
    id?: string;
    user_id?: string;
    username?: string;
    full_name?: string;
  },
  options?: { utmMedium?: string }
): string | null {
  const code = buildInviteCode(user);
  if (!code) return null;
  const origin =
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    (typeof window !== "undefined" ? window.location.origin : "") ||
    "https://zedu.chat";
  const medium = options?.utmMedium || "share";
  return `${origin}/invite/${code}?utm_source=invite&utm_medium=${encodeURIComponent(medium)}&utm_campaign=cohort`;
}

export const INVITE_UTM_QUERY =
  "utm_source=invite&utm_medium=referral&utm_campaign=cohort";

/** Append utm params to an app route (e.g. the sign-up page). */
export function withInviteUtm(path: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${INVITE_UTM_QUERY}`;
}

/* ------------------------------------------------------------------ */
/* Share targets (opened in a new tab with a prefilled message)         */
/* ------------------------------------------------------------------ */

export type ShareNetwork = "whatsapp" | "telegram" | "linkedin" | "email";

export function shareUrl(
  network: ShareNetwork,
  link: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  const encodedLink = encodeURIComponent(link);
  switch (network) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${message}`)}`;
    case "telegram":
      return `https://t.me/share/url?url=${encodedLink}&text=${encodeURIComponent(
        message.replace(link, "").trim() || "Join me on Zedu"
      )}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
    case "email":
      return `mailto:?subject=${encodeURIComponent("Join me on Zedu")}&body=${encodedMessage}`;
    default:
      return "";
  }
}

/* ------------------------------------------------------------------ */
/* Fire-and-forget tracking (visits / sign-ups per invite code)         */
/* ------------------------------------------------------------------ */

/**
 * Record an invite event (page visit or sign-up) against an invite code.
 * Silent by design: tracking must never break the landing page, and the
 * backend endpoint may not exist yet — failures are ignored.
 */
export async function trackInviteEvent(
  kind: "visit" | "signup",
  code: string,
  extra?: Record<string, unknown>
): Promise<void> {
  if (!code || typeof window === "undefined") return;
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    await fetch(`${base}/invite/${encodeURIComponent(code)}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: kind, invite_code: code, ...extra }),
      keepalive: true,
    });
  } catch {
    // fire-and-forget: never block the UI on tracking failures
  }
}
