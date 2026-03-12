import type { Metadata } from "next";
import { Courier_Prime, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

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
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${courierPrime.className} antialiased`}
      >
        <ClerkProvider>
          <header className="flex items-center justify-between px-8 py-4 h-14 bg-[#07090d] border-b border-white/10 fixed top-0 right-0 left-0 z-30">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-[#b48c50] text-lg leading-none">◈</span>
              <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#e4ddd3]/70">
                Resumter
              </span>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton>
                  <button className="font-mono text-[11px] tracking-widest uppercase text-[#e4ddd3]/50 hover:text-[#e4ddd3]/90 transition-colors px-3 py-1.5 cursor-pointer">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="font-mono text-[11px] tracking-widest uppercase bg-[#b48c50] text-[#07090d] px-4 py-1.5 hover:bg-[#c9a264] transition-colors cursor-pointer">
                    Sign up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
