import type { Metadata } from "next";
import { Courier_Prime, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Resumter",
  description: "AI Resume Analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark", inter.variable)}>
      <body
        className={`${courierPrime.className} antialiased`}
      >
        <ClerkProvider>
          <div className="fixed top-0 right-0 left-0 z-30 border-b border-border">
            <header className="max-w-[1340px] mx-auto flex items-center justify-between px-8 py-4 h-14 bg-background">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-foreground/70">
                  <Image src="/resumter-logo.png" alt="Logo" width={20} height={20} />
                  <Link href="/">Resumter</Link>
                </span>
              </div>

              {/* Auth */}
              <div className="flex items-center gap-3">
                <Show when="signed-out">
                  <SignInButton>
                    <button className="font-mono text-[11px] tracking-widest uppercase text-foreground/50 hover:text-foreground/90 transition-colors px-3 py-1.5 cursor-pointer">
                      Log in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="font-mono text-[11px] tracking-widest uppercase bg-primary text-primary-foreground px-4 py-1.5 hover:bg-primary-hover transition-colors cursor-pointer">
                      Sign up
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserMenu />
                </Show>
              </div>
            </header>
          </div>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
