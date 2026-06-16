import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { GuideBuy } from "@/components/guide-buy";
import { GUIDE, FREE_CHAPTER } from "@/lib/guide";
import { Check, LockSimple } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: `${GUIDE.title} · samhc.us`,
  description: GUIDE.subtitle,
};

export default function GuidePage() {
  return (
    <main>
      <Nav />

      <section className="pt-36 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {GUIDE.title}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
              {GUIDE.subtitle}
            </p>
          </Reveal>

          <Reveal index={1}>
            <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground max-w-lg">
              {GUIDE.pitch} Written by one person who actually ships this way.
              Every project on the front page of this site was built with the
              system in this guide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Free chapter, in full */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {FREE_CHAPTER.title}
              </h2>
              <span className="text-[11px] text-primary border border-primary/25 rounded-full px-2 py-px">
                free
              </span>
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="prose-mad">
              {FREE_CHAPTER.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {"What's inside"}
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Twelve chapters. The whole system, start to finish.
            </p>
          </Reveal>

          <div className="mt-6 divide-y divide-border/60">
            {GUIDE.toc.map((ch, i) => (
              <Reveal key={ch.n} index={Math.min(i, 4)}>
                <div className="flex items-start gap-4 py-3.5">
                  <span className="text-[11px] text-muted-foreground/40 pt-0.5 w-5 shrink-0 tabular-nums">
                    {ch.n}
                  </span>
                  <span className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-[14px] font-medium text-foreground">
                      {ch.title}
                    </span>
                    <span className="text-[13px] text-muted-foreground leading-relaxed">
                      {ch.blurb}
                    </span>
                  </span>
                  <span className="pt-1 shrink-0">
                    {ch.free ? (
                      <span className="text-[11px] text-primary">free</span>
                    ) : (
                      <LockSimple
                        size={12}
                        weight="bold"
                        className="text-muted-foreground/30"
                      />
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="rounded-2xl border border-primary/15 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(70,85,214,0.07),transparent_60%)] px-6 py-10 sm:px-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  One guide. One price<span className="text-primary">.</span>
                </h2>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  ${GUIDE.price}
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5">
                {GUIDE.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <Check
                      size={14}
                      weight="bold"
                      className="text-primary mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 max-w-sm">
                <GuideBuy />
              </div>

              <p className="mt-4 text-xs text-muted-foreground/50">
                No course. No upsell. No 4-hour video of me talking over slides.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
