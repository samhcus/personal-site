"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";

/** Polished signup toast — icon chip, title, supporting line. */
function subscribeToast(already: boolean) {
  toast.custom(() => (
    <div className="flex items-center gap-3 w-[320px] rounded-2xl border border-border bg-popover px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
          already ? "bg-foreground/[0.06] text-muted-foreground" : "bg-[#30d158]/15 text-[#30d158]"
        }`}
      >
        {already ? <EnvelopeSimple size={16} weight="fill" /> : <CheckCircle size={17} weight="fill" />}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-foreground leading-tight">
          {already ? "You're already in." : "You're in."}
        </p>
        <p className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
          {already
            ? "This address is on the list."
            : "First issue hits your inbox when it's ready."}
        </p>
      </div>
    </div>
  ));
}

/**
 * Shared newsletter signup logic. Both the homepage section and the footer
 * input POST to /api/subscribe; only the celebration differs per spot.
 */
export function useSubscribe(source: string, opts?: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "That didn't work. Try again.");
        return;
      }
      setEmail("");
      if (!data.already) opts?.onSuccess?.();
      subscribeToast(Boolean(data.already));
    } catch {
      toast.error("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, handleSubmit };
}
