export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  /** Short label shown in the meta row: studio, open source, startup… */
  type: string;
  status: "live" | "building";
  /** Where the whole panel links; null = the panel itself is the interaction. */
  href: string | null;
  external: boolean;
  /** Project accent for spotlight dots, list pills, focus rings. */
  accent: string;
  /** Soft tint of the accent for hover washes and pill backgrounds. */
  soft: string;
};

/**
 * The list, in order. Every project keeps its own brand color —
 * the site indigo never bleeds into them.
 */
export const projects: Project[] = [
  {
    slug: "chopsticks",
    name: "Chopsticks",
    oneLiner: "Open Source Discord Bot",
    type: "open source",
    status: "live",
    href: "https://github.com/samhcus/chopsticks",
    external: true,
    accent: "#2B8FD6",
    soft: "rgba(43, 143, 214, 0.08)",
  },
  {
    slug: "mad-house",
    name: "Mad House",
    oneLiner: "Creative build studio",
    type: "studio",
    status: "live",
    href: "https://github.com/madebymadhouse",
    external: true,
    accent: "#F03728",
    soft: "rgba(240, 55, 40, 0.06)",
  },
  {
    slug: "wok-specialists",
    name: "Wok Specialists",
    oneLiner: "Link-in-bio meets affiliates meets storefront, for food creators.",
    type: "startup",
    status: "building",
    href: "https://wokspec.org",
    external: true,
    accent: "#F97316",
    soft: "rgba(249, 115, 22, 0.08)",
  },
  {
    slug: "liquid-ui",
    name: "Liquid UI",
    oneLiner: "Dock runtime toolkit with a liquid glass theme.",
    type: "library",
    status: "building",
    href: "https://github.com/madebymadhouse/liquibar",
    external: true,
    accent: "#0891B2",
    soft: "rgba(8, 145, 178, 0.07)",
  },
  {
    slug: "urchin",
    name: "Urchin",
    oneLiner: "Local data ingestion layer.",
    type: "tool",
    status: "building",
    href: "https://github.com/samhcus/urchin",
    external: true,
    accent: "#7C3AED",
    soft: "rgba(124, 58, 237, 0.07)",
  },
  {
    slug: "agent-roster",
    name: "Agent Roster",
    oneLiner: "The pixel crew that ships with me. Hover one to meet them.",
    type: "the fleet",
    status: "live",
    href: null,
    external: false,
    accent: "#FFD700",
    soft: "rgba(255, 215, 0, 0.06)",
  },
  {
    slug: "lanyard",
    name: "3D Lanyard",
    oneLiner: "Physics lanyard badge with live text, logo, and pattern fill. Drag it.",
    type: "tool",
    status: "live",
    href: null,
    external: false,
    accent: "#4655D6",
    soft: "rgba(70, 85, 214, 0.06)",
  },
  {
    slug: "ticket",
    name: "Holographic Ticket",
    oneLiner: "Holographic event ticket with foil, perforations, and barcode.",
    type: "tool",
    status: "live",
    href: null,
    external: false,
    accent: "#A78BFA",
    soft: "rgba(167, 139, 250, 0.07)",
  },
];
