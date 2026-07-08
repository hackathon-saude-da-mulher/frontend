import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme/theme-provider";
import { Navbar } from "@/app/components/navbar";
import { SessionProvider } from "@/app/lib/session-context";
import { ChatProvider } from "@/app/conversas/useChat";
import { ServiceWorkerRegister } from "@/app/components/service-worker-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Susi – Saúde em Dia",
  title: "Saúde em Dia",
  description: "Assistente de saúde do SUS",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Susi",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121218" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ServiceWorkerRegister />
        <ThemeProvider>
          <SessionProvider>
            <ChatProvider>
              <main className="flex-1 pb-16">{children}</main>
              <Navbar />
            </ChatProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
