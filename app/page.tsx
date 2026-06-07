import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Bento } from "@/components/bento";
import { ContentFeed } from "@/components/content-feed";
import { IncomingSection } from "@/components/incoming-section";
import { CommunitySection } from "@/components/community-section";
import { CookieBanner } from "@/components/cookie-banner";
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
      <CommunitySection />
      <CookieBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
