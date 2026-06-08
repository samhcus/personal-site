import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ShipsSection } from "@/components/ships-section";
import { StudioSection } from "@/components/studio-section";
import { ContentFeed } from "@/components/content-feed";
import { CookieBanner } from "@/components/cookie-banner";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import { SamuelWidget } from "@/components/samuel-widget";

export default function Home() {
  return (
    <main>
      <CommandMenu />
      <SamuelWidget />
      <Nav />
      <Hero />
      <ShipsSection />
      <StudioSection />
      <ContentFeed />
      <CookieBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
