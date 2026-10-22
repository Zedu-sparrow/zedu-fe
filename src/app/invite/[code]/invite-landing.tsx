"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackInviteEvent, withInviteUtm } from "~/lib/invite";

interface InviteCohortLandingProps {
  code: string;
  inviter: string;
}

/**
 * Public landing page behind /invite/[code] (issue #200): shows who invited
 * you, a short line on what Zedu is, and a Sign up button. Records a per-code
 * visit event (fire-and-forget) for invite tracking.
 */
const InviteCohortLanding: React.FC<InviteCohortLandingProps> = ({
  code,
  inviter,
}) => {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (tracked) return;
    setTracked(true);
    void trackInviteEvent("visit", code, { path: window.location.pathname });
  }, [code, tracked]);

  const signUpHref = withInviteUtm(
    `/auth/sign-up?invite_code=${encodeURIComponent(code)}`
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F4F4FA] px-4 py-12">
      <div className="w-full max-w-[520px] rounded-2xl bg-white p-8 text-center shadow-[0_8px_30px_rgba(16,24,40,0.08)] sm:p-10">
        <Link href="/" className="inline-block" aria-label="Zedu home">
          <Image
            src="/Zedu.png"
            alt="Zedu logo"
            width={150}
            height={65}
            className="mx-auto h-auto w-auto max-w-[170px]"
            priority
          />
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-9 text-[#101828] sm:text-3xl sm:leading-10">
          {inviter} invites you to Zedu
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#475467] sm:text-base">
          Zedu is where our class learns and chats in one place — organised
          channels, live classes, shared files and AI study support, built for
          cohorts and classmates.
        </p>

        <Link
          href={signUpHref}
          className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7141F8] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#6030e8] sm:w-auto sm:min-w-[220px]"
        >
          Sign up
          <ArrowRight size={16} />
        </Link>

        <p className="mt-5 text-xs text-[#98A2B3]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#7141F8] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default InviteCohortLanding;
