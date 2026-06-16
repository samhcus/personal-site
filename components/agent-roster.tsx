"use client";

import { agents } from "@/lib/agents";
import { cn } from "@/lib/utils";

/** Progressive blur edge: stacked backdrop-blur layers, each masked a little deeper. */
function EdgeBlur({ side }: { side: "left" | "right" }) {
  const to = side === "left" ? "to right" : "to left";
  const layers = [
    { blur: 1, mask: `linear-gradient(${to}, black 0%, black 35%, transparent 70%)` },
    { blur: 3, mask: `linear-gradient(${to}, black 0%, black 18%, transparent 48%)` },
    { blur: 7, mask: `linear-gradient(${to}, black 0%, transparent 30%)` },
  ];
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 z-10 w-12",
        side === "left" ? "left-0" : "right-0"
      )}
    >
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${l.blur}px)`,
            WebkitBackdropFilter: `blur(${l.blur}px)`,
            maskImage: l.mask,
            WebkitMaskImage: l.mask,
          }}
        />
      ))}
    </div>
  );
}

/**
 * The roster marquee: all seven agents drift by side by side. The track holds
 * the roster twice, so the -50% keyframe loops seamlessly. Hovering the panel
 * pauses the scroll; hovering an agent raises their colored name tag.
 */
export function AgentRosterFace() {
  return (
    <div className="group/roster relative h-full overflow-hidden bg-[#101014]">
      <div className="agents-track flex h-full w-max items-end gap-8 px-5 pb-6 animate-[agents-marquee_28s_linear_infinite] group-hover/roster:[animation-play-state:paused]">
        {[...agents, ...agents].map((a, i) => (
          <div key={`${a.name}-${i}`} className="group/agent relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- pixel-art GIFs must skip next/image re-encoding */}
            <img
              src={a.gif}
              alt={a.name}
              width={52}
              height={52}
              draggable={false}
              className="h-[52px] w-[52px] select-none [image-rendering:pixelated]"
            />
            <span
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 translate-y-1 scale-90 rounded-md px-2 py-0.5 text-[10px] font-bold whitespace-nowrap opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover/agent:translate-y-0 group-hover/agent:scale-100 group-hover/agent:opacity-100"
              style={{ background: a.color, color: a.fg }}
            >
              {a.name}
            </span>
          </div>
        ))}
      </div>
      <EdgeBlur side="left" />
      <EdgeBlur side="right" />
      <span className="pointer-events-none absolute top-2.5 right-3.5 z-10 font-mono text-[9.5px] text-white/25">
        the fleet
      </span>
    </div>
  );
}
