"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  GithubLogo,
  XLogo,
  InstagramLogo,
  YoutubeLogo,
  EnvelopeSimple,
  ArrowRight,
} from "@phosphor-icons/react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@/components/ui/input";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { samuelSocials, SITE_EMAIL } from "@/lib/socials";
import { useSubscribe } from "@/lib/use-subscribe";
import { playSuccessChime } from "@/lib/sound";

const ease = [0.23, 1, 0.32, 1] as const;

const SOCIAL_ICONS: Record<string, React.JSX.Element> = {
  GitHub: <GithubLogo size={14} weight="fill" />,
  Twitter: <XLogo size={14} weight="fill" />,
  Instagram: <InstagramLogo size={14} weight="fill" />,
  YouTube: <YoutubeLogo size={14} weight="fill" />,
};

function HeroCard() {
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
    <CardContainer containerClassName="py-0 justify-start" className="w-full">
      <CardBody className="group/card relative h-auto w-full rounded-2xl border border-border bg-card p-5 overflow-hidden hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        <Confetti
          ref={confettiRef}
          manualstart
          className="pointer-events-none absolute inset-0 z-10 size-full"
        />

        {/* Photo */}
        <CardItem translateZ={70} className="w-full">
          <Image
            src="/brand/samuel-photo.jpg"
            alt="Samuel, sitting on a park bench with an iced coffee"
            width={668}
            height={1002}
            priority
            className="h-64 w-full rounded-xl object-cover object-[50%_22%] group-hover/card:shadow-xl"
          />
        </CardItem>

        {/* Name + socials */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <CardItem translateZ={50}>
            <p className="text-lg font-semibold tracking-tight text-foreground leading-none">
              Samuel
            </p>
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/60">
              @samhcus · Seattle, WA
            </p>
          </CardItem>
          <CardItem translateZ={40} className="flex items-center gap-1.5">
            {samuelSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label}, ${s.handle}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] active:scale-[0.92] transition-[color,border-color,background-color,transform] duration-150"
              >
                {SOCIAL_ICONS[s.label]}
              </a>
            ))}
            <a
              href={`mailto:${SITE_EMAIL}`}
              aria-label={`Email ${SITE_EMAIL}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] active:scale-[0.92] transition-[color,border-color,background-color,transform] duration-150"
            >
              <EnvelopeSimple size={14} weight="fill" />
            </a>
          </CardItem>
        </div>

        {/* Newsletter */}
        <CardItem translateZ={30} className="w-full mt-5">
          <p className="text-[12.5px] text-muted-foreground/60 leading-relaxed mb-3">
            {"What I'm building, what I'm learning, what ships next."}
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 rounded-full px-4 bg-foreground/[0.04] border-foreground/[0.1] text-sm flex-1 min-w-0 placeholder:text-muted-foreground/35 focus:border-primary/40 focus:ring-0"
            />
            <MagneticButton>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-foreground text-background hover:opacity-85 active:scale-[0.93] transition-[opacity,transform] duration-150 disabled:opacity-40"
              >
                <ArrowRight weight="bold" size={13} />
              </button>
            </MagneticButton>
          </form>
          <p className="mt-2.5 text-[11px] text-muted-foreground/35">
            No spam. Unsubscribe whenever.
          </p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="pt-[120px] pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="sr-only">Samuel</h1>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
}
