import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CommandMenuProvider } from "@/lib/command-menu-context";
import { FileTreeProvider } from "@/lib/file-tree-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mad House",
  description: "Ideas, guides, and tools for independent builders.",
  openGraph: {
    title: "Mad House",
    description: "Ideas, guides, and tools for independent builders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <TooltipProvider>
            <FileTreeProvider>
              <CommandMenuProvider>
                {children}
                <PageTransition />
                <Toaster position="bottom-center" />
              </CommandMenuProvider>
            </FileTreeProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
