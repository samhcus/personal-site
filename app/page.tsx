import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { StudioSection } from "@/components/studio-section";
import { ContentFeed } from "@/components/content-feed";
import { CommunitySection } from "@/components/community-section";
import { CookieBanner } from "@/components/cookie-banner";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import { FileTreeNav } from "@/components/file-tree-nav";
import { SamuelWidget } from "@/components/samuel-widget";

export default function Home() {
  return (
    <main>
      <CommandMenu />
      <FileTreeNav />
      <SamuelWidget />
      <Nav />
      <Hero />
      <WorkSection />
      <StudioSection />
      <ContentFeed />
      <CommunitySection />
      <CookieBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
