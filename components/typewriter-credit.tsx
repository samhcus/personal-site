"use client";

import { useEffect, useState } from "react";

const words = ["love", "coffee"];

type Phase = "typing" | "pausing" | "erasing";

export function TypewriterCredit() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const word = words[wordIndex];

    const chars = [...word]; // grapheme-safe split
    const displayedChars = [...displayed];

    if (phase === "typing") {
      if (displayedChars.length < chars.length) {
        const id = setTimeout(
          () => setDisplayed(chars.slice(0, displayedChars.length + 1).join("")),
          80,
        );
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setPhase("pausing"), 1800);
        return () => clearTimeout(id);
      }
    }

    if (phase === "pausing") {
      const id = setTimeout(() => setPhase("erasing"), 0);
      return () => clearTimeout(id);
    }

    if (phase === "erasing") {
      if (displayedChars.length > 0) {
        const id = setTimeout(
          () => setDisplayed(displayedChars.slice(0, -1).join("")),
          50,
        );
        return () => clearTimeout(id);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [phase, displayed, wordIndex]);

  return (
    <span className="text-[11px] text-muted-foreground/35 whitespace-nowrap">
      written with lots of{" "}
      <span className="inline-block min-w-[3ch]">
        {displayed}
        <span className="animate-pulse">|</span>
      </span>{" "}
      by Samuel{" "}
      <span className="font-mono">@samhcus</span>
    </span>
  );
}
