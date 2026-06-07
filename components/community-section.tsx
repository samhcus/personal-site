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
  { Icon: CalendarBlank, label: "Strategy Call" },
  { Icon: FileText,      label: "Landing Copy" },
  { Icon: MapTrifold,    label: "90-Day Plan" },
  { Icon: Gear,          label: "Stack Audit" },
  { Icon: ClipboardText, label: "Launch Checklist" },
  { Icon: ChatCircle,    label: "2-Wk Support" },
];

const socials = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg className="sc-btn-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="sc-btn-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="sc-btn-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function LaunchCard() {
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
          From idea to first customers, in 2 weeks. Positioning, landing page copy,
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

function EventTicket() {
  return (
    <>
      <svg className="et-filter-def" aria-hidden="true">
        <filter id="bump-community">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="5"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="et-card">
        <div className="et-bg" style={{ filter: "url(#bump-community)" }}>
          <div className="et-holographic" />
        </div>
        <div className="et-header">MAD HOUSE</div>
        <span className="et-symbol">♪</span>
        <div className="et-notes" aria-hidden="true">♪ ♫ ♪</div>
        <div className="et-body">
          <div className="et-body-date">Date TBD</div>
          <div className="et-body-venue">Location TBD</div>
        </div>
        <div className="et-footer">
          <div className="et-number">
            Seat <span className="et-bold">—</span>
          </div>
          <div className="et-barcode" aria-label="Barcode" />
        </div>
      </div>
    </>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-[11px] tracking-[0.14em] text-primary/70 uppercase">
            Everything we do
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl tracking-tight text-foreground">
            Right now.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center lg:justify-start">
          {/* Launch Sprint — tilted card */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            whileHover={{ rotate: 0, scale: 1.01 }}
            style={{ transformOrigin: "center bottom" }}
          >
            <LaunchCard />
          </motion.div>

          {/* Right column: ticket + social */}
          <div className="flex flex-col gap-10">
            {/* Event ticket */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              style={{ transformOrigin: "center bottom" }}
            >
              <EventTicket />
            </motion.div>

            {/* Social — minimal inline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <p className="text-[11px] tracking-[0.14em] text-primary/70 uppercase mb-3">
                Find us
              </p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-[200px]">
                Follow along for ideas, updates, and behind-the-scenes.
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sc-social-btn"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-center mt-14 text-xs text-muted-foreground"
        >
          3–4 spots per month. Currently{" "}
          <span className="text-primary">open</span>.
        </motion.p>
      </div>
    </section>
  );
}
