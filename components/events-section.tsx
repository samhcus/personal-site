"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

interface TicketProps {
  eventName: string;
  date: string;
  venue: string;
  seat: string;
  ticketNum: string;
  delay?: number;
}

function Ticket({ eventName, date, venue, seat, ticketNum, delay = 0 }: TicketProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {/* Hidden SVG filter for paper bump texture */}
      <svg className="et-filter-def" aria-hidden="true">
        <filter id={`bump-${ticketNum}`}>
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
        <div
          className="et-bg"
          style={{ filter: `url(#bump-${ticketNum})` }}
        >
          <div className="et-holographic" />
        </div>

        <div className="et-header">{eventName}</div>
        <span className="et-symbol">♪</span>

        <div className="et-notes" aria-hidden="true">♪ ♫ ♪</div>

        <div className="et-body">
          <div className="et-body-date">{date}</div>
          <div className="et-body-venue">{venue}</div>
        </div>

        <div className="et-footer">
          <div className="et-number">
            Seat <span className="et-bold">{seat}</span>
          </div>
          <div className="et-barcode" aria-label="Barcode" />
        </div>
      </div>
    </motion.div>
  );
}

const events: TicketProps[] = [
  {
    eventName: "MAD HOUSE",
    date: "Date TBD",
    venue: "Location TBD",
    seat: "—",
    ticketNum: "001",
    delay: 0,
  },
];

export function EventsSection() {
  return (
    <section id="events" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Events
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            In-person nights for builders. Tickets drop soon.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-12 items-start">
          {events.map((ev) => (
            <Ticket key={ev.ticketNum} {...ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
