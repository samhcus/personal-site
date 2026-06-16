"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  DiscordLogo,
  GithubLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  ArrowRight,
} from "@phosphor-icons/react";
import { socials } from "@/lib/socials";
import { TypewriterCredit } from "@/components/typewriter-credit";
import { BuyMeCoffee } from "@/components/buy-me-coffee";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { useSubscribe } from "@/lib/use-subscribe";
import { playSuccessChime } from "@/lib/sound";

const nav = [
  { label: "Projects", href: "/#projects" },
  { label: "Guide", href: "/guide" },
];

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <GithubLogo size={15} weight="fill" />,
  Twitter: <TwitterLogo size={15} weight="fill" />,
  Instagram: <InstagramLogo size={15} weight="fill" />,
  YouTube: <YoutubeLogo size={15} weight="fill" />,
  Discord: <DiscordLogo size={15} weight="fill" />,
};

const IMESSAGE_COLORS = [
  "#FF3B30", "#FF9500", "#FFCC00", "#34C759",
  "#007AFF", "#AF52DE", "#FF2D55", "#5AC8FA",
  "#ffffff", "#C7D0FF",
];

function NewsletterInput() {
  const confettiRef = useRef<ConfettiRef>(null);

  const celebrate = () => {
    playSuccessChime();
    confettiRef.current?.fire({
      particleCount: 130, spread: 100, angle: 270,
      origin: { x: 0.5, y: 0 }, colors: IMESSAGE_COLORS,
      startVelocity: 28, gravity: 0.55, scalar: 0.9, drift: 0,
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: 70, spread: 70, angle: 270,
        origin: { x: 0.15, y: 0 }, colors: IMESSAGE_COLORS,
        startVelocity: 22, gravity: 0.5, scalar: 0.85,
        disableForReducedMotion: true,
      });
    }, 160);
    setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: 70, spread: 70, angle: 270,
        origin: { x: 0.85, y: 0 }, colors: IMESSAGE_COLORS,
        startVelocity: 22, gravity: 0.5, scalar: 0.85,
        disableForReducedMotion: true,
      });
    }, 280);
  };

  const { email, setEmail, loading, handleSubmit } = useSubscribe("newsletter", {
    onSuccess: celebrate,
  });

  return (
    <div className="relative">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-[200] size-full"
      />
      <form onSubmit={handleSubmit}>
        <div className="flex items-center h-11 rounded-full border border-border bg-background transition-[border-color,box-shadow] duration-200 focus-within:border-foreground/30 focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.05)] dark:focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
            className="flex-1 min-w-0 h-full pl-5 pr-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/35 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Subscribe"
            className="flex items-center justify-center w-8 h-8 mr-1.5 shrink-0 rounded-full bg-foreground text-background hover:opacity-80 active:scale-[0.91] transition-[opacity,transform] duration-150 disabled:opacity-30"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-[1.5px] border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight weight="bold" size={13} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8">
      <div className="max-w-lg mx-auto text-center">

        {/* Newsletter */}
        <div className="pb-10 border-b border-border">
          <p className="text-sm font-medium text-foreground mb-1">
            Subscribe to my free newsletter.
          </p>
          <TypewriterCredit />
          <div className="mt-4">
            <NewsletterInput />
          </div>
          <p className="mt-2.5 text-[11px] text-muted-foreground/35">
            No spam. Unsubscribe whenever.
          </p>
        </div>

        {/* Identity */}
        <div className="pt-8 flex flex-col items-center gap-5">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            samhc.us
          </span>

          <nav className="flex gap-5">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-1.5">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground/[0.05] text-muted-foreground/60 hover:bg-foreground/[0.10] hover:text-foreground transition-colors duration-150"
              >
                {socialIcons[item.label]}
              </a>
            ))}
          </div>

          <BuyMeCoffee classname="w-full my-0" />

          <p className="text-[11px] text-muted-foreground/30">
            &copy; {new Date().getFullYear()} Samuel. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
