import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import PublicHeader from "@/components/header-auth";
import { Geist } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import Providers from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio Creator - Crea y gestiona portfolios de inversión",
  description: "Plataforma para crear y gestionar portfolios de inversión personalizados",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-5 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center">
                    <Link href={"/"} className="flex items-center gap-2">
                      <Image 
                        src="/sb-logo-n.svg" 
                        alt="Logo" 
                        width={120} 
                        height={38} 
                        className="dark:filter dark:invert" 
                      />
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <PublicHeader />
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-6">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/sb-logo-n.svg" 
                    alt="Logo" 
                    width={60} 
                    height={20} 
                    className="dark:filter dark:invert opacity-70" 
                  />
                  <span className="text-muted-foreground">|</span>
                  <span>
                    Portfolio Creator
                  </span>
                </div>
                <LanguageSwitcher />
              </footer>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
