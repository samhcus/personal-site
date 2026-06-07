import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Bento } from "@/components/bento";
import { ContentFeed } from "@/components/content-feed";
import { IncomingSection } from "@/components/incoming-section";
import { PricingSection } from "@/components/pricing-section";
import { EventsSection } from "@/components/events-section";
import { SocialCard } from "@/components/social-card";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import { FileTreeNav } from "@/components/file-tree-nav";

export default function Home() {
  return (
    <main>
      <CommandMenu />
      <FileTreeNav />
      <Nav />
      <Hero />
      <Bento />
      <ContentFeed />
      <IncomingSection />
      <PricingSection />
      <EventsSection />
      <SocialCard />
      <Newsletter />
      <Footer />
    </main>
  );
}
