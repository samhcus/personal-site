import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { UILibrary } from "@/components/ui-library";

export const metadata = {
  title: "UI Kit · samhc.us",
  description: "Small components from the site. Copy freely.",
};

export default function UIPage() {
  return (
    <main>
      <Nav />
      <UILibrary />
      <Footer />
    </main>
  );
}
