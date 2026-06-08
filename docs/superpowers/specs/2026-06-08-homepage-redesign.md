# Mad House Homepage Redesign

**Date:** 2026-06-08
**Status:** Approved, ready for implementation planning

---

## Identity

Mad House is Samuel's personal creative build house. One person, shipping fast: tools, apps, guides, tutorials, video, art, gag stuff, creative direction. The brand is the container. Samuel is the face. Nothing is shipped yet but the structure is built to receive content as it arrives.

Reference bar: Emil Kowalski for craft and polish. Marc Lou for the one-person-ships-everything model. The emotional register is raw, humble, playful, experimental, community-first.

---

## What Gets Removed

- "Est. 2025 · Creative Tools" label in the hero
- The physics lanyard badge (BadgeHero component) entirely
- The "What we ship" bento section (Bento component)
- The pipeline / incoming section (IncomingSection component)
- All fake text bars and placeholder copy that implies content exists

---

## Copy Rules (apply everywhere)

- No em dashes
- No all-caps text (not even for labels or mono tags)
- No marketing jargon ("ship fast", "builders who build", "no fluff")
- No fake data, fake names, fake stats
- Placeholder states are honest and intentional, not broken-looking

---

## Sections (in order)

### 1. Hero

**Goal:** Establish Samuel + Mad House in the first 3 seconds. Raw energy, no props.

**Layout:** Single column, left-aligned. Full viewport height. Dark background.

**Content:**
- Brand name: "Mad House" in large display type. Title case, not all-caps.
- Author line: "Samuel." just the name with a period. Small, below the brand name.
- One-liner beneath that: a short honest statement about what this place is. TBD with Samuel but something like "Building things in the open." Not a tagline. Not a slogan.
- A single rotating/cycling word or phrase that communicates the range without being a bullet list. Cycles through what gets built here (tools, guides, video, art, etc.). Smooth transition, not a ticker. Uses `transitions-dev` for the swap animation.
- Two CTAs: primary "Get inside" (scrolls to newsletter), secondary "See the work" (scrolls to work section). Rounded, minimal.

**What is removed:** The 2-column grid, the right-side illustration, the "Est. 2025 · Creative Tools" label, the "4 tools · Physics-based · Export-ready" stat line, the lanyard badge.

**Animation:** Fade-up stagger on load (keep existing pattern, it works). The cycling word uses a smooth vertical slide-in/out, not a crossfade.

---

### 2. Samuel Widget (floating)

**Goal:** Put a human face on the brand without making it a feature.

**Position:** Fixed, bottom-right corner. Always visible on desktop. On mobile: same position, slightly smaller.

**States:**
- Default: Small circle (48px), animated GIF of Samuel waving. No label, no tooltip. Just present.
- Hover: Subtle scale-up (1.05), no border flash. Cursor pointer.
- Active: scale-[0.97] per Emil rules.
- Click (video ready): Video panel slides up from bottom-right using `transitions-dev`. Contains an embedded intro video. Click outside or Esc dismisses it with a slide-down.
- Click (no video yet): Panel slides up with "Coming soon" state. Honest, not an error. Something like "Samuel's intro is on its way." with a close button.

**Implementation note:** Widget is its own component `SamuelWidget`. Video URL is a prop, null triggers the empty state.

---

### 3. The Work

**Goal:** Show everything that ships under Mad House without categorizing it into SaaS feature boxes.

**Layout:** An irregular pinboard-style grid. Not a uniform 3-column grid. Items have varying widths (some span 2 columns, some 1). Items coexist regardless of type: a tool sits next to a guide sits next to a video.

**Tile anatomy:** Each tile has a type indicator (small, lowercase, muted: "tool" / "guide" / "video" / "art"), a title, and a short honest description. No fake stats, no CTA inside the tile. The tile itself is the CTA.

**Empty state:** 3 tiles, each with a type indicator and a short honest placeholder. No lorem ipsum. Examples:
- type: "tool" / title: "Something useful" / desc: "A tool is being built. It'll be here soon."
- type: "guide" / title: "Something worth reading" / desc: "A guide is in progress."
- type: "video" / title: "Something worth watching" / desc: "Coming."

The tiles have the same visual weight as real tiles. When content arrives, swap in the real data.

**Transition:** Items fade in staggered on scroll-into-view.

---

### 4. Community

**Goal:** Signal that Mad House has a community dimension without the corporate "builders sharing what they're working on" wrapper copy.

**Design:** Statement-led. One sentence that captures the community's energy honestly. Then a join link (Discord or wherever people gather). No fake member counts, no avatar stack of made-up people.

**Empty state:** The statement is real. The join link is real (or "#" until it exists). No fake social proof.

---

### 5. Newsletter

**Goal:** Pull people into the Mad House world. Tight-knit, high-signal, not a generic newsletter.

**Positioning:** "Get inside Mad House." Not "get the newsletter." The audience and cadence are TBD but the shell is honest about that.

**Design:** One input (email), one button ("Get in"). Short copy beneath explaining what this is once the audience is defined. No fake subscriber count.

**Empty state:** The form works. The copy says something honest about what's coming.

---

## Skills Active for Implementation

- `emil-design-eng`: all animation and interaction decisions
- `transitions-dev`: the cycling word in hero, the Samuel widget panel slide
- `morphing-icons`: if icon swaps are needed in tiles or nav
- `sounds-on-the-web`: optional subtle audio on widget open/close (consult skill before adding)
- `shadcn`: component management

---

## What Does Not Change

- Nav (keep as-is)
- Footer (keep as-is)
- CommandMenu (keep as-is)
- FileTreeNav (keep as-is)
- Brand color: #F03728
- Font stack: Geist Sans + Geist Mono
- Dark mode support
