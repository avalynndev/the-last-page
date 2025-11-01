import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheLastPage",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="text-base relative h-screen max-h-screen">
            <Suspense>
              <Providers>
                <div className="flex h-full max-h-full">
                  <div className="relative flex flex-col h-full w-full">
                    {children}
                  </div>
                </div>
              </Providers>
            </Suspense>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
