import type { Metadata } from "next";
import { Inter, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

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

// Chopsticks' rounded, friendly face — used only inside its brand panel
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Samuel · samhc.us",
    template: "%s · samhc.us",
  },
  description:
    "Samuel's personal site. Startups, tools, and open source, shipped in the open.",
  openGraph: {
    title: "Samuel · samhc.us",
    description:
      "Samuel's personal site. Startups, tools, and open source, shipped in the open.",
    type: "website",
    siteName: "samhc.us",
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
      className={`${inter.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {children}
            <Toaster position="bottom-center" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
