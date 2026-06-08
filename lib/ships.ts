export type ShipStatus = "shipped" | "building";

export type Ship = {
  name: string;
  description: string;
  type: string;
  mrr: string;
  status: ShipStatus;
  href: string;
};

export const ships: Ship[] = [
  {
    name: "WokSpec",
    description: "Link-in-bio meets affiliates meets Shopify, built for food creators and chefs.",
    type: "startup",
    mrr: "—",
    status: "building",
    href: "https://wokspec.org",
  },
  {
    name: "Chopsticks",
    description: "Self-hostable Discord bot with flagship features. Fully open-source.",
    type: "open source",
    mrr: "$0",
    status: "shipped",
    href: "https://github.com/madebymadhouse/chopsticks",
  },
  {
    name: "AsciiGen",
    description: "ASCII art sandbox that turns anything into beautiful renders.",
    type: "tool",
    mrr: "$0",
    status: "shipped",
    href: "https://github.com/madebymadhouse/asciigen",
  },
  {
    name: "Liquibar",
    description: "Dock runtime toolkit for apps and websites with a liquid glass theme.",
    type: "library",
    mrr: "$0",
    status: "building",
    href: "https://github.com/madebymadhouse/liquibar",
  },
  {
    name: "KineTrack",
    description: "Coming.",
    type: "tool",
    mrr: "—",
    status: "building",
    href: "#",
  },
  {
    name: "traefik-route",
    description: "CLI for managing Traefik custom domain routes on Coolify-hosted servers.",
    type: "cli",
    mrr: "$0",
    status: "shipped",
    href: "https://github.com/madebymadhouse/traefik-route",
  },
];
