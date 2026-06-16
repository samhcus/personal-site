export type ToolStatus = "live" | "soon"

export interface StudioTool {
  slug: string
  name: string
  category: string
  description: string
  detail: string
  controls: string[]
  status: ToolStatus
}

export const studioTools: StudioTool[] = [
  {
    slug: "badge",
    name: "Badge Maker",
    category: "identity",
    description: "Physics lanyard badge with live text, logo, and pattern fill. Drag it.",
    detail: "Customise name, role, card color, text color, lanyard color, and pattern. Upload any logo. Grab and flick the badge. Export as PNG, JSX, or copy embed code.",
    controls: ["Name", "Role", "Logo upload", "Card & text color", "Pattern + density", "Export PNG / JSX"],
    status: "live",
  },
  {
    slug: "ticket",
    name: "Ticket Generator",
    category: "events",
    description: "Holographic event ticket with foil, perforations, and barcode.",
    detail: "Config-driven holographic ticket. Set event name, date, venue, tier. Toggle foil animation, perforation style, barcode type. Export as PNG or copy CSS.",
    controls: ["Event details", "Foil toggle", "Color scheme", "Barcode style", "Export PNG"],
    status: "live",
  },
  {
    slug: "social-card",
    name: "Social Card",
    category: "social",
    description: "3D perspective social card with tilt. Set handles, gradient, and export.",
    detail: "Branded social card for X, Instagram, YouTube. 3D tilt on hover, frosted glass, concentric logo circles. Configure gradient, handles, button colors.",
    controls: ["Handles", "Gradient", "Logo", "Button colors", "Export PNG"],
    status: "soon",
  },
  {
    slug: "pattern",
    name: "Pattern Studio",
    category: "texture",
    description: "Noise, dots, grids, hatching. Tileable at any scale.",
    detail: "Tileable patterns with full control over density, opacity, randomness, and color. Export as SVG or PNG. For card fills, section backgrounds, or print.",
    controls: ["Pattern type", "Density", "Color", "Scale", "Export SVG/PNG"],
    status: "soon",
  },
]
