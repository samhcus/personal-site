"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import {
  X,
  MapPin,
  ArrowUp,
  GithubLogo,
  XLogo,
  InstagramLogo,
  YoutubeLogo,
  EnvelopeSimple,
  GlobeHemisphereWest,
  Play,
} from "@phosphor-icons/react";
import { samuelSocials } from "@/lib/socials";
import { Globe3D } from "@/components/ui/3d-globe";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ease = [0.23, 1, 0.32, 1] as const;
const SEEN_KEY = "mh-welcome-seen";
const AVATAR = 96;
const PANEL_W = 360;
const GAP = 8;
const PAD = 16;
const PANEL_MAX_H = 680;

const GLOBE_MARKERS = [
  { lat: 47.6062, lng: -122.3321, src: "", label: "Seattle, WA" },
];

type WidgetView = "globe" | "video";

const PRESET_QA = [
  {
    id: "who-are-you",
    question: "Who are you?",
    answer:
      "A creator. I make things on the internet and ship them in the open — startups, tools, art, design, open source. No slop. No FOMO. Just making from the soul.",
  },
  {
    id: "what-are-you-making",
    question: "What are you making?",
    answer:
      "Mad House is my studio. Under it: Wok Specialists — a storefront for food creators. Chopsticks — a Discord bot. Liquid UI — a dock toolkit. Urchin — a local data layer. All built in the open.",
  },
  {
    id: "why-do-you-build",
    question: "Why do you build?",
    answer:
      "Because the gap between thought and reality is closing — and I want to be there when it does. I don't create to ship. I create because I have to. AI just makes it faster.",
  },
  {
    id: "guide",
    question: "The guide?",
    answer:
      "Vibe Code, Properly. 12 chapters on building real software with AI agents, solo. Not prompt tricks — the full operating discipline. $20, one time.",
  },
  {
    id: "reach-you",
    question: "How do I reach you?",
    answer: "samhcus@atomicmail.io. I respond when it's real.",
  },
] as const;

type Message = { role: "user" | "assistant"; text: string; id: number };

const SOCIAL_ICONS: Record<string, React.JSX.Element> = {
  GitHub: <GithubLogo size={15} weight="fill" />,
  Twitter: <XLogo size={15} weight="fill" />,
  Instagram: <InstagramLogo size={15} weight="fill" />,
  YouTube: <YoutubeLogo size={15} weight="fill" />,
};

function TypingDots() {
  return (
    <span className="inline-flex items-end gap-[3px] h-[18px] px-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-current opacity-60"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function SeattleTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
    let interval: ReturnType<typeof setInterval>;
    const id = requestAnimationFrame(() => {
      setTime(fmt.format(new Date()));
      interval = setInterval(() => setTime(fmt.format(new Date())), 30_000);
    });
    return () => {
      cancelAnimationFrame(id);
      clearInterval(interval);
    };
  }, []);

  if (!time) return null;
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className="font-mono text-[10px] text-muted-foreground/60 tabular-nums cursor-default"
      >
        {time}
      </TooltipTrigger>
      <TooltipContent side="top">My local time right now</TooltipContent>
    </Tooltip>
  );
}

const INTRO_BUBBLES = ["Hey — I'm Samuel.", "I make things. Tap to talk."];

function IntroBubbles() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= INTRO_BUBBLES.length) return;
    const t = setTimeout(
      () => setStep((s) => s + 1),
      step === 0 ? 0 : 900,
    );
    return () => clearTimeout(t);
  }, [step]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {INTRO_BUBBLES.slice(0, step).map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease }}
            className={`bg-primary text-primary-foreground px-4 py-2.5 text-[13.5px] leading-snug font-[450] shadow-[0_4px_20px_rgba(70,85,214,0.3)] ${
              i === INTRO_BUBBLES.length - 1
                ? "rounded-[20px] rounded-br-[6px]"
                : "rounded-[20px]"
            }`}
          >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>
      {step < INTRO_BUBBLES.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-primary text-primary-foreground px-4 py-3 rounded-[20px] rounded-br-[6px] shadow-[0_4px_20px_rgba(70,85,214,0.3)]"
        >
          <TypingDots />
        </motion.div>
      )}
    </>
  );
}

function useSnapToEdge() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      x.set(window.innerWidth - AVATAR - PAD);
      y.set(window.innerHeight - AVATAR - PAD);
      setInitialized(true);
    });
    return () => cancelAnimationFrame(id);
  }, [x, y]);

  useEffect(() => {
    const onResize = () => {
      x.set(
        Math.max(PAD, Math.min(window.innerWidth - AVATAR - PAD, x.get())),
      );
      y.set(
        Math.max(PAD, Math.min(window.innerHeight - AVATAR - PAD, y.get())),
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [x, y]);

  const snapToEdge = useCallback(() => {
    const cx = x.get() + AVATAR / 2;
    const targetX =
      cx < window.innerWidth / 2 ? PAD : window.innerWidth - AVATAR - PAD;
    const clampedY = Math.max(
      PAD,
      Math.min(window.innerHeight - AVATAR - PAD, y.get()),
    );
    animate(x, targetX, { type: "spring", stiffness: 400, damping: 32 });
    animate(y, clampedY, { type: "spring", stiffness: 400, damping: 32 });
  }, [x, y]);

  return { x, y, snapToEdge, initialized };
}

export function SamuelWidget() {
  const [open, setOpen] = useState(false);
  const [panelOrigin, setPanelOrigin] = useState("right bottom");
  const [seen, setSeen] = useState(true);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [view, setView] = useState<WidgetView>("video");
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(0);
  const isDragging = useRef(false);
  const reduce = useReducedMotion();
  const { x, y, snapToEdge, initialized } = useSnapToEdge();

  // Panel left: flush beside the avatar, switching sides based on which half of the screen
  // the avatar is on. Clamped so the panel never escapes either horizontal edge.
  const panelLeft = useTransform(x, (ax) => {
    if (typeof window === "undefined") return 0;
    const vw = window.innerWidth;
    const panelW = Math.min(PANEL_W, vw - 2 * PAD);
    // Not enough room for side-by-side → center the panel
    if (vw < AVATAR + GAP + panelW + 2 * PAD) {
      return Math.max(PAD, (vw - panelW) / 2);
    }
    const onLeft = ax + AVATAR / 2 < vw / 2;
    if (onLeft) {
      // Avatar on left → panel goes right; clamp so it doesn't escape the right edge
      return Math.min(ax + AVATAR + GAP, vw - panelW - PAD);
    } else {
      // Avatar on right → panel goes left; clamp so it doesn't escape the left edge
      return Math.max(PAD, ax - panelW - GAP);
    }
  });

  // Panel top: opens in whichever vertical direction has more room.
  // The panel's actual CSS max-height is viewport-constrained so this always fits.
  const panelTop = useTransform(y, (ay) => {
    if (typeof window === "undefined") return 0;
    const vh = window.innerHeight;
    const panelH = Math.min(PANEL_MAX_H, vh - 2 * PAD);
    const avatarBottom = ay + AVATAR;
    const spaceAbove = ay - PAD;
    const spaceBelow = vh - avatarBottom - PAD;
    // Prefer opening upward (panel bottom aligns to avatar bottom);
    // if more space below, open downward instead.
    const top =
      spaceAbove >= spaceBelow
        ? avatarBottom - panelH   // grows up
        : ay;                     // grows down from avatar top
    return Math.max(PAD, Math.min(vh - panelH - PAD, top));
  });

  // Intro bubbles sit above the avatar button
  const bubbleX = useTransform(x, (v) =>
    typeof window === "undefined" || v + AVATAR / 2 < window.innerWidth / 2
      ? v
      : v + AVATAR - 230,
  );
  const bubbleY = useTransform(y, (v) => v - 10);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setSeen(localStorage.getItem(SEEN_KEY) === "1"),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (seen || reduce) return;
    const t = setTimeout(() => setBubbleVisible(true), 1500);
    return () => clearTimeout(t);
  }, [seen, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleToggle = useCallback(() => {
    if (isDragging.current) return;
    setOpen((prev) => {
      const nextOpen = !prev;
      if (nextOpen) {
        const ax = x.get();
        const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
        const onLeft = ax + AVATAR / 2 < vw / 2;
        setPanelOrigin(`${onLeft ? "left" : "right"} bottom`);
        setBubbleVisible(false);
        localStorage.setItem(SEEN_KEY, "1");
        setSeen(true);
      }
      return nextOpen;
    });
  }, [x]);

  const switchView = useCallback((next: WidgetView) => {
    if (next === "globe" && videoRef.current) {
      videoRef.current.pause();
      setVideoStarted(false);
    }
    setView(next);
  }, []);

  const handleVideoPlay = useCallback(() => {
    setVideoStarted(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  }, []);

  const askQuestion = (qa: (typeof PRESET_QA)[number]) => {
    if (typing) return;
    const uid = ++msgId.current;
    const aid = ++msgId.current;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: qa.question, id: uid },
    ]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: qa.answer, id: aid },
      ]);
      setTyping(false);
    }, 650 + Math.random() * 450);
  };

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text, id: ++msgId.current },
    ]);
    setTyping(true);
    let reply = "Not live right now — but reach me at samhcus@atomicmail.io.";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.text) reply = data.text;
      else if (res.status === 429) reply = "Easy. Give me a second between messages.";
    } catch {
      // fall through to email fallback
    }
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: reply, id: ++msgId.current },
    ]);
    setTyping(false);
  };

  return (
    <>
      {/* Intro bubbles — above the avatar, hidden once panel opens */}
      <AnimatePresence>
        {bubbleVisible && !open && initialized && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease }}
            style={{ x: bubbleX, y: bubbleY, width: 230 }}
            className="fixed top-0 left-0 z-50 cursor-pointer select-none"
            onClick={handleToggle}
          >
            <div className="absolute bottom-0 right-0 flex flex-col items-end gap-1.5 w-[230px]">
              <IntroBubbles />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel — sits flush beside the avatar, tracks it via motion transforms */}
      <AnimatePresence>
        {open && initialized && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
            transition={{ duration: 0.24, ease }}
            style={{
              position: "fixed",
              left: panelLeft,
              top: panelTop,
              transformOrigin: panelOrigin,
              zIndex: 50,
            }}
            className="w-[min(360px,calc(100vw-2rem))] max-h-[min(680px,calc(100dvh-2rem))] rounded-[24px] border border-border/60 bg-background/98 shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Chat with Samuel"
          >
            {/* Header */}
            <div className="relative flex flex-col items-center pt-5 pb-4 px-4 border-b border-border/50 bg-foreground/[0.015] shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3.5 right-3.5 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-foreground/[0.07] text-muted-foreground hover:bg-foreground/[0.12] active:scale-[0.93] transition-[background-color,transform] duration-150"
                aria-label="Close"
              >
                <X weight="bold" size={11} />
              </button>

              <p className="text-[15px] font-semibold text-foreground tracking-tight">
                Samuel
              </p>
              <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                samhc.us · Seattle, WA
              </p>

              {/* Intro / Location tab switcher */}
              <div className="mt-3 w-full flex rounded-lg border border-border/50 bg-foreground/[0.02] p-0.5 gap-0.5">
                <button
                  onClick={() => switchView("video")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium transition-all duration-200 ${
                    view === "video"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  <Play
                    size={10}
                    weight={view === "video" ? "fill" : "regular"}
                  />
                  Intro
                </button>
                <button
                  onClick={() => switchView("globe")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium transition-all duration-200 ${
                    view === "globe"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  <GlobeHemisphereWest
                    size={10}
                    weight={view === "globe" ? "fill" : "regular"}
                  />
                  Location
                </button>
              </div>

              {/* Media area */}
              <div className="mt-2 w-full rounded-xl overflow-hidden border border-border/50">
                <AnimatePresence mode="wait" initial={false}>
                  {view === "globe" ? (
                    <motion.div
                      key="globe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Globe3D
                        className="h-[200px] w-full"
                        markers={GLOBE_MARKERS}
                        config={{
                          autoRotateSpeed: 0.5,
                          showAtmosphere: true,
                          atmosphereColor: "#6E86FF",
                          atmosphereIntensity: 0.15,
                          atmosphereBlur: 2,
                          enableZoom: true,
                          minDistance: 3.5,
                          maxDistance: 8,
                          radius: 2,
                          ambientIntensity: 0.8,
                          pointLightIntensity: 2.0,
                        }}
                      />
                      <div className="px-3 py-1.5 border-t border-border/40 flex items-center gap-1.5">
                        <MapPin
                          weight="fill"
                          size={10}
                          className="text-[#FF3B30]/70"
                        />
                        <span className="text-[10px] text-muted-foreground/50">
                          Seattle, WA
                        </span>
                        <span className="ml-auto">
                          <SeattleTime />
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative h-[200px] bg-zinc-950 overflow-hidden"
                    >
                      <video
                        ref={videoRef}
                        src="/video/site-intro.mp4"
                        className="w-full h-full object-cover"
                        playsInline
                        preload="metadata"
                        controls={videoStarted}
                        onEnded={() => setVideoStarted(false)}
                      />
                      <AnimatePresence>
                        {!videoStarted && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            onClick={handleVideoPlay}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/50"
                            aria-label="Play intro"
                          >
                            <motion.div
                              whileTap={{ scale: 0.93 }}
                              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25"
                            >
                              <Play
                                size={18}
                                weight="fill"
                                className="text-white ml-0.5"
                              />
                            </motion.div>
                            <span className="mt-2 text-[10px] text-white/50 font-medium tracking-wide">
                              Watch intro
                            </span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Socials */}
              <div className="mt-3 flex items-center gap-1.5">
                {samuelSocials.map((s) => (
                  <Tooltip key={s.label}>
                    <TooltipTrigger
                      render={
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${s.label}, ${s.handle}`}
                        />
                      }
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] active:scale-[0.92] transition-[color,border-color,background-color,transform] duration-150"
                    >
                      {SOCIAL_ICONS[s.label]}
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {s.handle} on {s.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href="mailto:samhcus@atomicmail.io"
                        aria-label="Email Samuel"
                      />
                    }
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] active:scale-[0.92] transition-[color,border-color,background-color,transform] duration-150"
                  >
                    <EnvelopeSimple size={15} weight="fill" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    samhcus@atomicmail.io
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 min-h-[60px]">
              {messages.length === 0 && !typing && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[12px] text-muted-foreground/30">
                    Pick a question, or just type.
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-[13.5px] leading-relaxed font-[440] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-[20px] rounded-br-[6px]"
                        : "bg-foreground/[0.07] text-foreground rounded-[20px] rounded-bl-[6px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-foreground/[0.07] text-foreground rounded-[20px] rounded-bl-[6px] px-4 py-3"
                  >
                    <TypingDots />
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies + composer */}
            <div className="px-4 pb-4 pt-3 border-t border-border/40 shrink-0">
              <div className="flex flex-wrap gap-2">
                {PRESET_QA.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => askQuestion(qa)}
                    disabled={typing}
                    className="h-8 px-3.5 rounded-full text-[12px] font-medium border border-border text-muted-foreground bg-transparent hover:border-foreground/30 hover:text-foreground hover:bg-foreground/[0.03] active:scale-[0.96] transition-[border-color,color,background-color,transform] duration-150 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="mt-3 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={500}
                  placeholder="Or just ask…"
                  aria-label="Message Samuel"
                  className="flex-1 h-9 px-4 rounded-full border border-border bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/30 transition-colors duration-150"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || typing}
                  aria-label="Send"
                  className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-primary text-primary-foreground active:scale-[0.93] transition-[transform,opacity] duration-150 disabled:opacity-30"
                >
                  <ArrowUp weight="bold" size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating avatar — always visible, draggable anchor for the panel */}
      {initialized && (
        <motion.button
          drag
          dragMomentum={false}
          style={{ x, y, position: "fixed", top: 0, left: 0, zIndex: 51 }}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={() => {
            snapToEdge();
            setTimeout(() => {
              isDragging.current = false;
            }, 200);
          }}
          onTap={handleToggle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            !seen && !reduce
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -4, 4, -4, 4, -2, 2, 0],
                }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          transition={
            !seen && !reduce
              ? {
                  opacity: { duration: 0.4, ease },
                  scale: { duration: 0.4, ease },
                  rotate: {
                    duration: 0.7,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: 2,
                  },
                }
              : { duration: 0.4, ease }
          }
          whileTap={{ scale: 0.91 }}
          whileDrag={{ scale: 1.06, cursor: "grabbing" }}
          className={`w-[96px] h-[96px] rounded-[26px] cursor-grab active:cursor-grabbing touch-none select-none border-[3px] border-background bg-card group transition-shadow duration-200 ${
            open
              ? "shadow-[0_8px_32px_rgba(0,0,0,0.25),0_0_0_3px_rgba(70,85,214,0.2)]"
              : "shadow-[0_8px_32px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.12)]"
          }`}
          aria-label={open ? "Close chat" : "Chat with Samuel"}
          aria-expanded={open}
        >
          <span className="absolute inset-0 rounded-[23px] overflow-hidden">
            <Image
              src="/brand/samuel-memoji.png"
              alt="Samuel"
              fill
              sizes="96px"
              className="object-cover object-top pointer-events-none"
              draggable={false}
              priority
            />
          </span>
        </motion.button>
      )}
    </>
  );
}
