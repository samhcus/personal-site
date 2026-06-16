"use client";

import Image from "next/image";
import { reading } from "@/lib/reading";
import { Reveal } from "@/components/reveal";

export function ReadingSection() {
  return (
    <section id="reading" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Currently reading<span className="text-primary">.</span>
          </h2>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-6 w-full overflow-hidden rounded-xl border border-border">
            <img
              src="/reading/reading.gif"
              alt="reading on a train"
              className="w-full h-auto object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {reading.map((book, i) => (
            <Reveal key={book.title} index={i + 2}>
              <figure className="group w-[130px]">
                <div className="overflow-hidden rounded-lg border border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out group-hover:-translate-y-1">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    width={260}
                    height={390}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="text-[12px] font-medium text-foreground leading-tight">
                    {book.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/60 leading-snug">
                    {book.author}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
