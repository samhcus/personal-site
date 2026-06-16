"use client";

import { useState } from "react";
import { toast } from "sonner";
import { GUIDE } from "@/lib/guide";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function GuideBuy() {
  const [email, setEmail] = useState("");
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingWaitlist, setLoadingWaitlist] = useState(false);
  const [joined, setJoined] = useState(false);

  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const startCheckout = async () => {
    if (loadingCheckout) return;
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        toast.error(data.error ?? "Checkout unavailable. Try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Could not start checkout. Try again.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (stripeKey) {
    return (
      <MagneticButton>
        <PulsatingButton
          onClick={startCheckout}
          disabled={loadingCheckout}
          duration="2.4s"
          className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150 disabled:opacity-60"
        >
          {loadingCheckout ? "Loading..." : `Get the guide, $${GUIDE.price}`}
        </PulsatingButton>
      </MagneticButton>
    );
  }

  const joinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loadingWaitlist) return;
    setLoadingWaitlist(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "guide-waitlist" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "That didn't work. Try again.");
        return;
      }
      setJoined(true);
    } catch {
      toast.error("Couldn't reach the server. Try again in a moment.");
    } finally {
      setLoadingWaitlist(false);
    }
  };

  if (joined) {
    return (
      <p className="text-sm text-foreground font-medium">
        {"You're on the list. Launch email coming your way."}
      </p>
    );
  }

  return (
    <form onSubmit={joinWaitlist} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="h-11 rounded-full px-5 bg-foreground/[0.04] border border-foreground/[0.1] text-sm flex-1 min-w-0 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40"
      />
      <MagneticButton>
        <button
          type="submit"
          disabled={loadingWaitlist}
          className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150 disabled:opacity-60 shrink-0"
        >
          {loadingWaitlist ? "Joining..." : "Get launch access"}
        </button>
      </MagneticButton>
    </form>
  );
}
