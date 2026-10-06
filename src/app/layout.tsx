import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import "./responsive.css";
import "react-loading-skeleton/dist/skeleton.css";
import { DataProvider } from "~/store/GlobalState";
import Script from "next/script";
import ClientLayout from "./client-layout";
import { gtmScriptUrl } from "~/lib/env-urls";
import { ThemeProvider } from "~/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "Zedu",
  icons: {
    icon: "/TelexIcon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const googleAnalyticsScriptUrl = gtmScriptUrl().trim();
  const hasGoogleAnalyticsConfig =
    Boolean(googleAnalyticsId) && Boolean(googleAnalyticsScriptUrl);

  return (
    <html
      lang="en"
      className="max-w-screen overflow-x-hidden relative"
      suppressHydrationWarning
    >
      <head>
        {hasGoogleAnalyticsConfig && (
          <>
            <Script
              async
              src={`${googleAnalyticsScriptUrl}?id=${googleAnalyticsId}`}
            />
            <Script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', ${JSON.stringify(googleAnalyticsId)}, {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>

      <body className="max-w-screen overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>
            <DataProvider>{children}</DataProvider>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
