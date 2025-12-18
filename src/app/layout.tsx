import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { LanguageProvider } from "@/lib/i18n/context";
import { LoginProvider } from "@/providers/LoginProvider";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Feed",
  description: "S-Social Feed",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <LoginProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LanguageProvider defaultLanguage="en">
                <SidebarProvider defaultOpen={defaultOpen}>
                  <AppSidebar />
                  <SidebarInset>
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur px-4">
                      <SidebarTrigger />
                      <div className="flex flex-1 justify-end">
                        <Header />
                      </div>
                    </header>
                    <main className="flex flex-1 flex-col">{children}</main>
                  </SidebarInset>
                </SidebarProvider>
              </LanguageProvider>
            </ThemeProvider>
          </LoginProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
