"use client";

import { motion } from "motion/react";
import {
  CalendarBlank,
  FileText,
  MapTrifold,
  Gear,
  ClipboardText,
  ChatCircle,
} from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  { Icon: CalendarBlank, label: "Strategy Call"   },
  { Icon: FileText,      label: "Landing Copy"    },
  { Icon: MapTrifold,    label: "90-Day Plan"     },
  { Icon: Gear,          label: "Stack Audit"     },
  { Icon: ClipboardText, label: "Launch Checklist"},
  { Icon: ChatCircle,    label: "2-Wk Support"    },
];

function TicketCard() {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="ticket-bump">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="ticket-card">
        <div className="ticket-bg" />
        <div className="ticket-holo" />
        {([20, 40, 60] as const).map((y, i) => (
          <div key={i} className="ticket-notes" style={{ transform: `translateY(${y}%)` }}>
            MH&nbsp;
          </div>
        ))}
        <div className="ticket-hdr">MH</div>
        <div className="ticket-body">
          <div className="ticket-symbol">★</div>
          <p style={{ fontSize: "0.65rem", lineHeight: 1.7, color: "#111", opacity: 0.8, marginTop: "0.5rem" }}>
            2-week sprint<br />
            Copy · Strategy<br />
            Roadmap · Support
          </p>
        </div>
        <div className="ticket-ftr">
          <div className="ticket-num">
            <span className="ticket-bold">001</span> / 2025
          </div>
          <div className="ticket-barcode" />
        </div>
      </div>
    </div>
  );
}

function NeoCard() {
  return (
    <div className="neo-card">
      <div className="neo-card-pattern-grid" />
      <div className="neo-card-overlay-dots" />

      <div className="neo-card-title-area">
        The Launch Sprint
        <span className="neo-card-tag">Solo</span>
      </div>

      <div className="neo-card-body">
        <p className="neo-card-description">
          From idea to first customers — in 2 weeks. Positioning, landing page copy,
          90-day roadmap, and async support so you can focus on building.
        </p>

        <div className="neo-feature-grid">
          {features.map(({ Icon, label }) => (
            <div key={label} className="neo-feature-item">
              <div className="neo-feature-icon">
                <Icon weight="fill" size={13} />
              </div>
              <span className="neo-feature-text">{label}</span>
            </div>
          ))}
        </div>

        <div className="neo-card-actions">
          <div className="neo-price">
            <span className="neo-price-currency">$</span>
            1,000
            <span className="neo-price-period">per project</span>
          </div>
          <a href="#newsletter" className="neo-card-button">
            Apply Now
          </a>
        </div>
      </div>

      <div className="neo-stamp">
        <span className="neo-stamp-text">Mad House</span>
      </div>
      <div className="neo-corner-slice" />
      <div className="neo-accent-shape" />
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.14em] text-primary/70 uppercase">
            Work with us
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-foreground">
            One package.<br />No retainers.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A focused 2-week engagement. We handle the thinking so you can handle the building.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <TicketCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <NeoCard />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-center mt-12 text-xs text-muted-foreground"
        >
          3–4 spots per month. Currently{" "}
          <span className="text-primary font-semibold">open</span>.
        </motion.p>
      </div>
    </section>
  );
}
