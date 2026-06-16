export const GUIDE = {
  number: "001",
  title: "Vibe Code, Properly.",
  subtitle:
    "The solo builder's operating manual for shipping real products with AI agents.",
  pitch:
    "Not prompt tricks. The full operating discipline of context, verification, taste, and shipping, for building production software alone, with agents, without drowning in broken code.",
  price: 5,
  /** Set NEXT_PUBLIC_GUIDE_CHECKOUT_URL to open real checkout. Until then the buy button joins the waitlist. */
  checkoutUrl: process.env.NEXT_PUBLIC_GUIDE_CHECKOUT_URL ?? null,
  includes: [
    "The full guide: 12 chapters, written once, kept current",
    "Lifetime updates as the tools change",
    "Private #guide channel in Samuel's Discord",
    "Every workflow file I actually use, copy-paste ready",
  ],
  toc: [
    { n: 1, title: "The vibe coding lie", free: true, blurb: "What vibe coding actually is, and why prompts are the least important part." },
    { n: 2, title: "Set up the harness", free: false, blurb: "Your repo is the prompt: conventions, agent config files, and guardrails that compound." },
    { n: 3, title: "Context is the product", free: false, blurb: "The model can only be as good as what it sees. Memory, indexes, and feeding the right code." },
    { n: 4, title: "The interview before the build", free: false, blurb: "Make the agent interrogate you. Specs from conversations, not from vibes." },
    { n: 5, title: "Small loops, real checkpoints", free: false, blurb: "Plan, build, verify, repeat. Never accept a 'done' you didn't watch run." },
    { n: 6, title: "Taste is the only moat", free: false, blurb: "Everyone has the same model. Training your judgment is the part nobody can copy." },
    { n: 7, title: "When the model lies", free: false, blurb: "Hallucinated APIs, fake data, confident nonsense: the failure modes and how to catch each one." },
    { n: 8, title: "Refactor or rot", free: false, blurb: "When to stop vibing and read the code. Managing debt when an agent writes most of it." },
    { n: 9, title: "Ship it scared", free: false, blurb: "Domains, deploys, self-hosting. Getting it in front of people before it feels ready." },
    { n: 10, title: "Brand every room", free: false, blurb: "Why each project deserves its own name and identity, and how that multiplies attention." },
    { n: 11, title: "Build in the open", free: false, blurb: "The ship log, the community loop, and turning the work itself into distribution." },
    { n: 12, title: "The compounding studio", free: false, blurb: "Memory, skills, automations. A setup that gets smarter with every project you ship." },
  ],
} as const;

/** Chapter 1, free in full on /guide. The manuscript lives in content/vibe-code-properly.md. */
export const FREE_CHAPTER = {
  title: "The vibe coding lie",
  paragraphs: [
    "Vibe coding has a reputation problem, and it earned it. The phrase conjures someone mashing tab in a chat window, pasting errors back at the model until something runs, and shipping whatever survives. That is real, it happens everywhere, and it produces the software equivalent of wet cardboard.",
    "Here is the part nobody selling prompt packs will tell you: the model was never the bottleneck. Give the same agent to two builders and one ships a product while the other ships a demo that collapses the first time a real user touches it. Same model. Same tools. The difference is everything around the prompt: what the agent can see, what it's allowed to do, what happens when it claims to be finished, and whether anyone in the loop has taste.",
    "Vibe coding, done properly, is a management job. You are not typing the code, but you are responsible for all of it. That means you set the constraints before the work starts, you make the agent prove its claims, and you read what matters. The skill ceiling isn't prompting. It's judgment: knowing what good looks like, noticing when something is off, and refusing to ship slop even when the slop compiles.",
    "Judgment can be trained. Constraints can be written down. Verification can become a habit instead of a hope. That is what the rest of this guide is: the operating discipline I use to run a one-person studio where agents write most of the code, and the products still hold up. No tricks. A system.",
    "One more thing before we start: everything in here is what I actually do. The config files are lifted from my repos, the failure stories are mine. When the tools change, the guide updates. You bought a manual, not a snapshot.",
  ],
} as const;
