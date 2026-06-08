import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { LocationCard } from "@/components/ui/location-card";

const nav = [
  { label: "Ships",      href: "#work"       },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Studio",     href: "/studio"     },
];

const social = [
  { label: "X",         href: "https://x.com/madebymadhouse"         },
  { label: "Instagram", href: "https://instagram.com/madebymadhouse"  },
  { label: "YouTube",   href: "https://youtube.com/@madebymadhouse"   },
];

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4">
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-8 opacity-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Mad House" width={20} height={20} className="rounded-sm" />
              <span className="text-sm font-medium tracking-tight text-foreground">Mad House</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Based in</span>
              <LocationCard />
            </div>
          </div>

          {/* Nav + social + copyright */}
          <div className="flex flex-col sm:items-end gap-3">
            <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/50">
              &copy; {new Date().getFullYear()} Mad House
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
