"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { playSuccessChime } from "@/lib/sound";
import { useSubscribe } from "@/lib/use-subscribe";

export function Newsletter() {
  const confettiRef = useRef<ConfettiRef>(null);

  const celebrate = () => {
    playSuccessChime();
    confettiRef.current?.fire({
      particleCount: 90,
      spread: 70,
      origin: { x: 0.5, y: 0.8 },
      colors: ["#4655D6", "#6E86FF", "#ffffff", "#C7D0FF", "#111111"],
      startVelocity: 28,
      gravity: 0.9,
      scalar: 0.8,
      disableForReducedMotion: true,
    });
    confettiRef.current?.fire({
      particleCount: 50,
      spread: 110,
      origin: { x: 0.5, y: 0.8 },
      colors: ["#4655D6", "#6E86FF", "#ffffff"],
      startVelocity: 18,
      gravity: 0.85,
      scalar: 0.65,
      decay: 0.92,
      disableForReducedMotion: true,
    });
  };

  const { email, setEmail, loading, handleSubmit } = useSubscribe("newsletter", {
    onSuccess: celebrate,
  });

  return (
    <section id="newsletter" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="relative rounded-2xl border border-primary/15 bg-[radial-gradient(ellipse_at_50%_0%,rgba(70,85,214,0.08),transparent_60%)] px-6 py-10 sm:px-10 overflow-hidden">
            <Confetti
              ref={confettiRef}
              manualstart
              className="pointer-events-none absolute inset-0 z-10 size-full"
            />
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Newsletter<span className="text-primary">.</span>
              </h2>
              <p className="mt-2 text-[13px] text-muted-foreground max-w-sm leading-relaxed">
                {"What I'm building, what I'm learning, what ships next. Written by me, sent when there's actually something worth saying."}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex items-center gap-2 max-w-sm"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 rounded-full px-4 bg-foreground/[0.04] border-foreground/[0.1] text-sm flex-1 min-w-0 placeholder:text-muted-foreground/35 focus:border-primary/40 focus:ring-0"
                />
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-foreground text-background text-[13px] font-medium shrink-0 hover:opacity-85 active:scale-[0.96] transition-[opacity,transform] duration-150 disabled:opacity-40"
                  >
                    {loading ? "..." : "Subscribe"}
                    {!loading && <ArrowRight weight="bold" size={13} />}
                  </button>
                </MagneticButton>
              </form>

              <p className="mt-4 text-xs text-muted-foreground/40">
                No spam. Unsubscribe whenever.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
