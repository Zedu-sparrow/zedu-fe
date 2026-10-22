"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Check, Link as LinkIcon, Mail, X } from "lucide-react";
import {
  DEFAULT_INVITE_MESSAGE,
  ShareNetwork,
  buildInviteLink,
  shareUrl,
} from "~/lib/invite";
import { DataContext } from "~/store/GlobalState";
import { showSuccess } from "~/components/toast/sonner";

const SHARE_NETWORKS: { network: ShareNetwork; label: string }[] = [
  { network: "whatsapp", label: "WhatsApp" },
  { network: "telegram", label: "Telegram" },
  { network: "linkedin", label: "LinkedIn" },
  { network: "email", label: "Email" },
];

interface InviteCohortModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Invite your cohort" panel (issue #200): shows the logged-in user their
 * personal invite link with one-tap copy, quick share buttons and a
 * ready-made message preview.
 */
const InviteCohortModal: React.FC<InviteCohortModalProps> = ({
  open,
  onClose,
}) => {
  const { state } = useContext(DataContext);
  const user = state?.user;
  const [copied, setCopied] = useState(false);

  const inviteLink = useMemo(
    () => (open ? buildInviteLink(user) : null),
    [open, user]
  );
  const message = inviteLink ? DEFAULT_INVITE_MESSAGE(inviteLink) : "";

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  const handleCopy = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context): fall back
      const textarea = document.createElement("textarea");
      textarea.value = inviteLink;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    showSuccess("Invite link copied! Share it with your cohort.");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (network: ShareNetwork) => {
    if (!inviteLink) return;
    window.open(
      shareUrl(network, inviteLink, message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && handleClose()}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl bg-white p-6 sm:p-7">
        <DialogHeader className="space-y-1.5 p-0 text-left sm:text-left">
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="text-xl font-bold text-[#101828]">
              Invite your cohort
            </DialogTitle>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close invite dialog"
              className="rounded-md p-1 text-[#667085] transition-colors hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm leading-5 text-[#475467]">
            Share your link so classmates and colleagues can join you on Zedu.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#344054]">
              Your invite link
            </label>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={inviteLink || ""}
                placeholder="Generating your invite link…"
                aria-label="Your invite link"
                onFocus={(e) => e.currentTarget.select()}
                className="h-10 min-w-0 flex-1 truncate rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] outline-none focus:ring-2 focus:ring-[#8686F9]/30"
              />
              <button
                type="button"
                onClick={handleCopy}
                disabled={!inviteLink}
                className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-[#7141F8] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6030e8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copied ? <Check size={15} /> : <LinkIcon size={15} />}
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-semibold text-[#344054]">
              Or share directly
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SHARE_NETWORKS.map(({ network, label }) => (
                <button
                  key={network}
                  type="button"
                  disabled={!inviteLink}
                  onClick={() => handleShare(network)}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm font-medium text-[#344054] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:font-semibold"
                >
                  {network === "email" && <Mail size={15} />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-semibold text-[#344054]">
              Message preview
            </p>
            <div className="rounded-lg bg-[#F4F4FA] px-3.5 py-3 text-sm leading-5 text-[#344054]">
              {message || "Your invite message will appear here."}
            </div>
          </div>

          {copied && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl bg-[#344054] px-4 py-2.5 text-sm font-medium text-white"
            >
              <Check size={15} />
              Link copied
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCohortModal;
