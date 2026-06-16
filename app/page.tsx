import { Nav } from "@/components/nav";
import { ProjectsGrid } from "@/components/projects-grid";
import { GuideSection } from "@/components/guide-section";
import { ReadingSection } from "@/components/reading-section";
import { CommunitySection } from "@/components/community-section";
import { Footer } from "@/components/footer";
import { SamuelWidget } from "@/components/samuel-widget";

export default function Home() {
  return (
    <main>
      <SamuelWidget />
      <Nav />
      <div className="pt-[80px]">
        <GuideSection />
      </div>
      <ProjectsGrid />
      <ReadingSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}
