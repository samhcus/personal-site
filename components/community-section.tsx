"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { DISCORD_INVITE, SITE_EMAIL } from "@/lib/socials";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { MagneticButton } from "@/components/ui/magnetic-button";

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -28.5 256 256"
      fill="currentColor"
      aria-hidden
    >
      <path d="M216.856 16.597C200.285 8.843 182.566 3.208 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.845-14.046C73.353 3.208 55.613 8.864 39.042 16.638 5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193 5.215-7.177 9.866-14.807 13.873-22.848-7.631-2.9-14.94-6.478-21.846-10.632 1.832-1.357 3.624-2.776 5.356-4.236 42.122 19.702 87.89 19.702 129.51 0 1.752 1.46 3.543 2.879 5.356 4.236-6.926 4.175-14.255 7.753-21.886 10.653 4.007 8.02 8.638 15.67 13.873 22.847 21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.288-9.081-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18 0-14.376 10.17-26.2 23.015-26.2 12.845 0 23.415 11.819 23.215 26.2.02 14.375-10.37 26.18-23.215 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18 0-14.376 10.17-26.2 23.014-26.2 12.845 0 23.415 11.819 23.215 26.2 0 14.375-10.37 26.18-23.215 26.18z" />
    </svg>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="text-[#5865F2]">
              <DiscordIcon size={15} />
            </span>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Samuel&apos;s Discord
            </h2>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <PulsatingButton
                onClick={() => window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer")}
                duration="2.4s"
                className="inline-flex items-center gap-1.5 rounded-full h-9 px-4 text-[13px] font-medium bg-[#5865F2] text-white hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150"
              >
                <span className="inline-flex items-center gap-1.5">
                  Join the server
                  <ArrowUpRight size={12} weight="bold" />
                </span>
              </PulsatingButton>
            </MagneticButton>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
            >
              {SITE_EMAIL}
            </a>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground/40">
            I respond to emails. Or try to. Please don&apos;t spam me.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
