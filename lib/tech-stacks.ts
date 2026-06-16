export type TechItem = {
  name: string;
  color?: string;
};

export type BrandStack = {
  slug: string;
  label: string;
  accent: string;
  panel: string;
  panelFg: string;
  stack: TechItem[];
};

export const techStacks: BrandStack[] = [
  {
    slug: "chopsticks",
    label: "Chopsticks",
    accent: "#2B8FD6",
    panel: "#7EC8F2",
    panelFg: "#0F2D40",
    stack: [
      { name: "Python" },
      { name: "discord.py" },
      { name: "PostgreSQL" },
      { name: "Docker" },
      { name: "Redis" },
      { name: "GitHub Actions" },
      { name: "Alpine Linux" },
      { name: "SQLite" },
    ],
  },
  {
    slug: "wok-specialists",
    label: "WokSpec",
    accent: "#F97316",
    panel: "#0C0C0C",
    panelFg: "#F0EDE8",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Supabase" },
      { name: "Stripe" },
      { name: "Vercel" },
      { name: "React" },
      { name: "Edge Functions" },
    ],
  },
  {
    slug: "asciigen",
    label: "AsciiGen",
    accent: "#16A34A",
    panel: "#052E16",
    panelFg: "#86EFAC",
    stack: [
      { name: "Python" },
      { name: "Pillow" },
      { name: "NumPy" },
      { name: "WebAssembly" },
      { name: "Click CLI" },
      { name: "Pytest" },
    ],
  },
  {
    slug: "liquid-ui",
    label: "Liquid UI",
    accent: "#0891B2",
    panel: "#164E63",
    panelFg: "#CFFAFE",
    stack: [
      { name: "React" },
      { name: "Three.js" },
      { name: "TypeScript" },
      { name: "WebGL" },
      { name: "CSS API" },
      { name: "Vite" },
    ],
  },
  {
    slug: "traefik-route",
    label: "traefik-route",
    accent: "#64748B",
    panel: "#1E293B",
    panelFg: "#CBD5E1",
    stack: [
      { name: "Go" },
      { name: "Cobra" },
      { name: "Traefik" },
      { name: "Coolify" },
      { name: "Docker" },
      { name: "Bash" },
    ],
  },
];
