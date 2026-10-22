import type { Metadata } from "next";
import React from "react";
import { ogImageUrl } from "~/lib/env-urls";
import { parseInviteCode } from "~/lib/invite";
import InviteCohortLanding from "./invite-landing";

interface InvitePageProps {
  params: Promise<{ code: string }>;
}

const FALLBACK_NAME = "Your classmate";

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { code } = await params;
  const payload = parseInviteCode(code);
  const inviter = payload?.n?.trim();

  const title = inviter
    ? `${inviter} invited you to join Zedu`
    : "You're invited to join Zedu";
  const description = inviter
    ? `Join ${inviter} on Zedu — the workspace where our class learns and chats in one place.`
    : "Join Zedu — the workspace where our class learns and chats in one place.";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      siteName: "Zedu",
      type: "website",
      images: [
        {
          url: ogImageUrl("og-image-5.png"),
          width: 1200,
          height: 630,
          alt: "Zedu learning platform for cohorts and classes",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl("og-image-5.png")],
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params;
  const payload = parseInviteCode(code);
  const inviter = payload?.n?.trim() || FALLBACK_NAME;

  return <InviteCohortLanding code={code} inviter={inviter} />;
}
