"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Plus } from "@phosphor-icons/react";
import { projects, type Project } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { WokLogo } from "@/components/brand/wok-logo";
import { AgentRosterFace } from "@/components/agent-roster";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
} from "@/components/motion-primitives/morphing-dialog";

/* ─── Face components ──────────────────────────────────────────────── */

function MadHouseFace() {
  return (
    <div className="relative h-full overflow-hidden bg-[#111111]">
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[360px] h-[200px]"
        style={{ background: "radial-gradient(ellipse, rgba(240,55,40,0.18) 0%, transparent 70%)" }}
      />
      <div className="relative h-full flex flex-col items-center justify-center gap-2.5">
        <Image src="/brand/madhouse-icon.png" alt="" width={46} height={46} className="rounded-xl" />
        <span className="font-mono text-[10px] text-[#F03728]/80">@madebymadhouse</span>
      </div>
      <span className="absolute bottom-2.5 right-3.5 font-mono text-[9.5px] text-white/25">stay mad</span>
    </div>
  );
}

function ChopsticksFace() {
  return (
    <div className="relative h-full overflow-hidden font-[family-name:var(--font-nunito)]">
      <div className="flex items-center gap-2.5 bg-[#7EC8F2] px-5 py-2.5">
        <Image src="/brand/chopsticks.png" alt="" width={24} height={24} className="rounded-lg" />
        <span className="text-[13.5px] font-bold tracking-tight text-[#0F2D40]">Chopsticks</span>
        <span className="ml-auto text-[10px] font-bold text-[#0F2D40]/50">pick up your server</span>
      </div>
      <div className="h-full bg-[#313338] px-5 py-3.5">
        <div className="flex gap-3">
          <Image src="/brand/chopsticks.png" alt="" width={34} height={34} className="w-[34px] h-[34px] rounded-full shrink-0" />
          <div className="min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#7EC8F2]">Chopsticks</span>
              <span className="rounded-[4px] bg-[#5865F2] px-1 py-px text-[8.5px] font-bold text-white leading-[1.4]">✓ bot</span>
            </span>
            <p className="text-[12.5px] text-[#DBDEE1] leading-snug">Self-hosted. Open source. Yours.</p>
          </div>
        </div>
        <div className="mt-2.5 rounded-lg bg-[#383A40] px-3 py-1.5 text-[11px] font-medium text-[#949BA4]">
          <span className="text-[#DBDEE1]">/</span> type a command
        </div>
      </div>
    </div>
  );
}

function WokFace() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0C0C0C] px-5 pt-3.5">
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[240px]"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.22) 0%, transparent 70%)" }}
      />
      <div className="relative flex items-center gap-2">
        <span className="mh-steam inline-block animate-[mh-steam_3.2s_ease-in-out_infinite] text-[#F97316]">
          <WokLogo size={20} />
        </span>
        <span className="text-[13.5px] font-semibold tracking-tight text-[#F0EDE8]">Wok Specialists</span>
        <span className="ml-auto font-mono text-[9.5px] text-[#6B6B6B]">compile your kitchen</span>
      </div>
      <div className="relative mt-3 rounded-xl border border-[#242424] bg-[#141414] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 bg-[#1C1C1C] px-3 py-1.5">
          <span className="flex items-center gap-[5px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#FF5F57]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#28C840]" />
          </span>
          <span className="flex-1 rounded-[5px] bg-[#2C2C2E] px-2 py-0.5 text-center font-mono text-[9px] text-[#666]">
            samuel.wokspec.org
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2">
          {[{ label: "Kitchen", color: "#F97316" }, { label: "Fridge", color: "#22C55E" }, { label: "Shelf", color: "#3B82F6" }].map((tab) => (
            <span key={tab.label} className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1C] border border-[#242424] px-2.5 py-1 text-[10px] font-medium text-[#F0EDE8]/80">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: tab.color }} />
              {tab.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiquidUIFace() {
  return (
    <div className="relative h-full overflow-hidden" style={{ background: "linear-gradient(135deg, #164E63 0%, #0E7490 100%)" }}>
      <div className="relative h-full flex flex-col items-center justify-center gap-3">
        <span className="text-[17px] font-semibold tracking-tight text-[#CFFAFE]">Liquid UI</span>
        <div className="relative flex items-end gap-1.5 rounded-2xl border border-white/15 bg-white/10 px-2.5 py-1.5 backdrop-blur-sm overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="w-6 h-6 rounded-lg border border-white/20 bg-white/15" />
          ))}
          <span aria-hidden className="mh-glass-sheen pointer-events-none absolute inset-y-0 w-10 bg-white/20 blur-md animate-[mh-glass-sheen_3.6s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

function UrchinFace() {
  return (
    <div className="relative h-full overflow-hidden bg-[#160E22] font-mono">
      <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-[#C4B5FD]/10">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[9.5px] text-[#C4B5FD]/40">urchin</span>
      </div>
      <div className="px-4 pt-4 text-[13px] leading-relaxed text-[#C4B5FD]">
        <span className="text-[#C4B5FD]/50">$</span> urchin ingest ./data
        <span className="mh-blink ml-1 inline-block w-[7px] h-[14px] translate-y-[2px] bg-[#C4B5FD] animate-[mh-blink_1.1s_steps(1)_infinite]" />
      </div>
      <span className="absolute bottom-2.5 right-3.5 text-[9.5px] text-[#C4B5FD]/35">local-first</span>
    </div>
  );
}

function LanyardFace() {
  return (
    <div className="relative h-full overflow-hidden bg-[#18181B]">
      <span aria-hidden className="absolute left-1/2 top-0 h-9 w-[2px] -translate-x-[13px] rotate-[8deg] bg-[#4655D6]/70" />
      <div className="relative h-full flex items-center justify-center pt-4">
        <div className="w-[78px] rotate-[4deg] rounded-lg border border-white/10 bg-[#F8F8F8] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
          <span className="block h-[3px] w-full rounded-full bg-[#4655D6]" />
          <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-[#111]/80" />
          <span className="mt-1 block h-1 w-1/2 rounded-full bg-[#111]/30" />
          <span className="mt-2.5 block h-3 w-full rounded-[3px] bg-[#111]/10" />
        </div>
      </div>
      <span className="absolute bottom-2.5 right-3.5 font-mono text-[9.5px] text-white/25">drag it</span>
    </div>
  );
}

function TicketFace() {
  return (
    <div className="relative h-full overflow-hidden bg-[#14101E]">
      <div className="relative h-full flex items-center justify-center">
        <div className="relative flex w-[170px] overflow-hidden rounded-lg border border-white/10 bg-[#1E1830] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
          <div className="flex-1 p-2.5">
            <span className="block h-[5px] w-full rounded-full" style={{ background: "linear-gradient(120deg, #A78BFA, #67E8F9, #F0ABFC)" }} />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/70" />
            <span className="mt-1 block h-1 w-1/2 rounded-full bg-white/25" />
          </div>
          <div className="flex w-9 flex-col items-center justify-center gap-[2px] border-l border-dashed border-white/20 py-2">
            {[3, 1, 2, 1, 3, 2, 1].map((w, i) => (
              <span key={i} className="block rounded-sm bg-white/60" style={{ width: `${w * 5}px`, height: "2px" }} />
            ))}
          </div>
          <span aria-hidden className="mh-glass-sheen pointer-events-none absolute inset-y-0 w-10 bg-white/15 blur-md animate-[mh-glass-sheen_3.6s_ease-in-out_infinite]" />
        </div>
      </div>
      <span className="absolute bottom-2.5 right-3.5 font-mono text-[9.5px] text-white/25">holo</span>
    </div>
  );
}

const FACES: Record<string, () => React.JSX.Element> = {
  "mad-house": MadHouseFace,
  chopsticks: ChopsticksFace,
  "wok-specialists": WokFace,
  "liquid-ui": LiquidUIFace,
  urchin: UrchinFace,
  "agent-roster": AgentRosterFace,
  lanyard: LanyardFace,
  ticket: TicketFace,
};

/* ─── Status dot ───────────────────────────────────────────────────── */

function StatusDot({ status }: { status: Project["status"] }) {
  const live = status === "live";
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className="inline-flex items-center gap-1.5 cursor-default"
        aria-label={live ? "Shipped and live" : "In the works"}
      >
        <span className={live ? "w-1.5 h-1.5 rounded-full bg-[#30d158]" : "mh-pulse-dot w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-[mh-pulse-dot_2s_ease-in-out_infinite]"} />
        <span className="text-[10px] font-mono text-muted-foreground/50">{live ? "live" : "building"}</span>
      </TooltipTrigger>
      <TooltipContent side="top">{live ? "Shipped and live" : "In the works right now"}</TooltipContent>
    </Tooltip>
  );
}

/* ─── Projects list row ────────────────────────────────────────────── */

function ProjectRow({ project }: { project: Project }) {
  const content = (
    <div className="group flex items-center gap-3.5 py-4">
      <span className="w-[3px] h-8 rounded-full shrink-0" style={{ background: project.accent, opacity: 0.65 }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13.5px] font-semibold text-foreground tracking-tight">{project.name}</span>
        </div>
        <p className="text-[12.5px] text-muted-foreground/60 leading-snug">{project.oneLiner}</p>
      </div>
      {project.href && (
        project.external
          ? <ArrowUpRight size={13} weight="bold" className="shrink-0 text-muted-foreground/25 group-hover:text-muted-foreground/55 transition-colors duration-200" />
          : <ArrowRight size={13} weight="bold" className="shrink-0 text-muted-foreground/25 group-hover:text-muted-foreground/55 transition-colors duration-200" />
      )}
    </div>
  );

  const cls = "block w-full text-left rounded-lg px-1 -mx-1 hover:bg-foreground/[0.025] transition-colors duration-150";

  if (!project.href) return <div className={cls}>{content}</div>;
  if (project.external) return <a href={project.href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>;
  return <Link href={project.href} className={cls}>{content}</Link>;
}

/* ─── Misc card (MorphingDialog) ───────────────────────────────────── */

const DESC_VARIANTS = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: 10, scale: 0.97 },
};

function MiscCard({ project }: { project: Project }) {
  const TriggerFace = FACES[project.slug];
  const ContentFace = FACES[project.slug];

  return (
    <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: 0.28 }}>
      <MorphingDialogTrigger
        style={{ borderRadius: "14px" }}
        className="flex w-full flex-col overflow-hidden border border-border/60 bg-card hover:border-foreground/20 transition-colors duration-200 cursor-pointer text-left"
      >
        <div className="h-28 overflow-hidden">
          {TriggerFace && <TriggerFace />}
        </div>
        <div className="flex items-end justify-between px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <MorphingDialogTitle className="text-[13px] font-semibold text-foreground leading-tight">
              {project.name}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-[10px] font-mono text-muted-foreground/45 mt-px">
              {project.type}
            </MorphingDialogSubtitle>
          </div>
          <span
            className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground/50 hover:bg-foreground/[0.05] hover:text-foreground transition-colors duration-150"
            aria-label="Open details"
          >
            <Plus size={11} weight="bold" />
          </span>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{ borderRadius: "20px" }}
          className="pointer-events-auto relative flex w-full flex-col overflow-hidden border border-border bg-background shadow-[0_32px_80px_rgba(0,0,0,0.22)] sm:w-[440px]"
        >
          <div className="h-44 overflow-hidden">
            {ContentFace && <ContentFace />}
          </div>
          <div className="p-6">
            <MorphingDialogTitle className="text-xl font-semibold text-foreground tracking-tight">
              {project.name}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="mt-0.5 text-[11px] font-mono text-muted-foreground/50">
              {project.type}
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={DESC_VARIANTS}
            >
              <p className="mt-4 text-[13.5px] text-muted-foreground leading-relaxed">
                {project.oneLiner}
              </p>
              {project.href && (
                project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors duration-150"
                  >
                    Open interface <ArrowUpRight size={13} weight="bold" />
                  </a>
                ) : (
                  <Link
                    href={project.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors duration-150"
                  >
                    Open interface <ArrowRight size={13} weight="bold" />
                  </Link>
                )
              )}
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className="text-muted-foreground hover:text-foreground transition-colors duration-150" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */

type SectionView = "projects" | "misc";

const PROJECT_SLUGS = ["chopsticks", "mad-house", "wok-specialists", "liquid-ui", "urchin"];
const MISC_SLUGS    = ["agent-roster", "lanyard", "ticket"];

const ease = [0.23, 1, 0.32, 1] as const;

export function ProjectsGrid() {
  const [view, setView] = useState<SectionView>("projects");

  const projectList = PROJECT_SLUGS.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const miscList    = MISC_SLUGS.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as Project[];

  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">My Projects & Prototypes</h2>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Everything ships in the open.
              </p>
            </div>

            {/* View picker */}
            <div className="flex shrink-0 items-center gap-0.5 rounded-lg border border-border/50 bg-foreground/[0.02] p-0.5">
              <button
                onClick={() => setView("projects")}
                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                  view === "projects"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground/55 hover:text-muted-foreground"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setView("misc")}
                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                  view === "misc"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground/55 hover:text-muted-foreground"
                }`}
              >
                Misc
              </button>
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          {view === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="mt-4"
            >
              {projectList.map((project, i) => (
                <div key={project.slug} className={i < projectList.length - 1 ? "border-b border-border/40" : ""}>
                  <ProjectRow project={project} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="misc"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {miscList.map((project) => (
                <MiscCard key={project.slug} project={project} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
