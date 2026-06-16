# Vibe Code, Properly.

**The solo builder's operating manual for shipping real products with AI agents.**

By Samuel — samhc.us. Guide 001. $20, lifetime updates.

> Draft manuscript. This file is the product source. Chapter 1 is published free on samhc.us/guide. Edit ruthlessly before release — it should sound like you on your best day.

---

## 1. The vibe coding lie

Vibe coding has a reputation problem, and it earned it. The phrase conjures someone mashing tab in a chat window, pasting errors back at the model until something runs, and shipping whatever survives. That is real, it happens everywhere, and it produces the software equivalent of wet cardboard.

Here is the part nobody selling prompt packs will tell you: the model was never the bottleneck. Give the same agent to two builders and one ships a product while the other ships a demo that collapses the first time a real user touches it. Same model. Same tools. The difference is everything around the prompt — what the agent can see, what it's allowed to do, what happens when it claims to be finished, and whether anyone in the loop has taste.

Vibe coding, done properly, is a management job. You are not typing the code, but you are responsible for all of it. That means you set the constraints before the work starts, you make the agent prove its claims, and you read what matters. The skill ceiling isn't prompting — it's judgment: knowing what good looks like, noticing when something is off, and refusing to ship slop even when the slop compiles.

Judgment can be trained. Constraints can be written down. Verification can become a habit instead of a hope. That is what the rest of this guide is: the operating discipline I use to run a one-person studio where agents write most of the code, and the products still hold up. No tricks. A system.

One more thing before we start: everything in here is what I actually do — the config files are lifted from my repos, the failure stories are mine. When the tools change, the guide updates. You bought a manual, not a snapshot.

## 2. Set up the harness

An agent in an empty folder is a tourist. An agent in a well-set-up repo is staff. The difference is the harness: the files and conventions that are loaded into every session before you type a word.

The centerpiece is the agent instruction file (CLAUDE.md, AGENTS.md — the name depends on your tool). Treat it as a contract, not documentation. Documentation describes; a contract binds. Mine contain things like: never invent placeholder data — use "TBD" and say so; all custom CSS lives in one file, prefixed per component; new dependencies need a reason. Every rule exists because an agent once did the wrong thing and I never wanted to see it again. That's the maintenance loop: when the agent surprises you badly, the fix is usually a sentence in the contract, not a better prompt next time.

Three properties make a contract work:

- **Specific enough to be checkable.** "Write clean code" binds nothing. "No `transition: all` — name the properties" binds.
- **Short enough to be loaded.** These files ride along in every session. Past a few hundred lines, you're paying attention-tax on rules that rarely apply. Prune.
- **True.** The fastest way to teach an agent to ignore your contract is to leave stale rules in it.

Beyond the contract: a real linter config (the agent will obey it more consistently than any junior ever did), a typecheck that actually fails the build, scripts that run with one command, and a README that states what the project is in one paragraph. Everything you'd set up for a human team pays double with agents, because agents read it every single session and never get bored of it.

## 3. Context is the product

A model's output quality tracks one variable more than any other: whether the right information was in its context window when it answered. Bad output is usually missing context, not missing intelligence.

You manage context in three time horizons:

**Per task.** Point the agent at the files that matter instead of letting it grep around and guess. "Look at how `work-index.tsx` does brand theming before touching the case study page" saves a wrong-pattern implementation. If a task depends on a decision made last month, restate the decision — don't assume.

**Per project.** The contract file from chapter 2, plus whatever index your tools support — code-graph tools, semantic search, even a hand-written architecture note. The goal is that "how does auth work here" costs the agent one lookup, not twelve file reads with three wrong guesses.

**Across everything.** This is the one nobody does: persistent memory. A folder of small files — decisions, preferences, things that went wrong — that gets loaded or queried in each session. Mine remembers that I never want fake data in components, how my VPS is laid out, which upstream repo had injection bugs. Sessions stop starting from zero. Your agent on day 200 should know things your agent on day 1 didn't, or you've been paying the same onboarding cost two hundred times.

The discipline that makes all three work: when you correct the agent, ask whether the correction should outlive the conversation. If yes, it goes in the contract or the memory — immediately, while you're annoyed enough to write it sharply.

## 4. The interview before the build

The most expensive words in vibe coding are "build me a…" followed by a vague noun. The agent will fill every unspecified blank with the most generic choice available, because that's what "most likely" means. Generic is the default. You have to evict it.

So don't start with instructions. Start with an interview — and make the agent run it. Before any creative or structural work, my agents are required to ask about the things I haven't said: who is this for, what does done look like, what existing thing should this feel like, what must it never do. Five minutes of questions routinely saves two hours of confidently wrong building.

Then make it write the plan down — not for ceremony, but because a written plan is the only thing you can disagree with *before* it's code. Reading a plan costs minutes. Reading a diff that implements the wrong plan costs an afternoon, plus the argument with yourself about whether to keep the sunk cost.

A good plan, agent-sized: the goal in one sentence, the files it intends to touch, the order of operations, what it will *not* do, and how you'll both know it worked. If any of those five is fuzzy, the interview wasn't finished.

The deeper principle: instructions say *what*, the interview surfaces *why*. An agent that knows why can make a hundred small decisions correctly without asking. An agent that only knows what will make them all generically.

## 5. Small loops, real checkpoints

The single biggest predictor of vibe coding disasters is loop size. Sessions that run for an hour before anyone checks anything produce hour-sized failures.

Work in loops small enough that failure is cheap: one feature, one fix, one refactor per loop. Plan, build, verify, commit. Then the next loop starts from known-good. When something breaks, the suspect list is one diff long.

The non-negotiable rule sits at the end of each loop: **never accept "done" you didn't watch run.** Agents are excellent at the *feeling* of completion — green checkmarks in prose, confident summaries, "all tests passing!" written by the same process that didn't run the tests. The claim is not the evidence. Run the build. Click the button. Hit the endpoint. If it's a UI, look at it — screenshots or a live tab, not the agent's description of what it rendered.

Commits are your save points, and agents make them nearly free — let the agent write the commit message; make it accurate, not poetic. Commit at every known-good state. The psychological effect is real: when rollback costs nothing, you let the agent attempt bigger, more interesting changes, because the worst case is `git reset` instead of an archaeology dig.

Tests fit here exactly as far as they earn their keep: for logic, parsers, money math — write them first and let the agent code against them; they turn verification from a manual chore into a checkpoint that runs itself. For layout and feel, your eyes are the test suite. Don't let an agent talk you into either extreme.

## 6. Taste is the only moat

Every builder you compete with has access to the same models you do. The code generation is commoditized. What's left — the entire remaining game — is knowing what to build and recognizing when it's good. That's taste, and it's trainable.

Three exercises, lifted from how designers train and applied to building with agents:

**Consume the best on purpose.** Find the practitioners whose work makes you stop scrolling, and study it like a mechanic, not a fan. Why does this site feel calm? Why does this animation feel expensive? Specifics, written down. Your taste library is built from deconstructed examples, not from vibes about vibes.

**Audit your own reactions.** When agent output feels off and you can't say why — stop. "Something's wrong with the spacing" is a feeling; "the section gaps are uneven so nothing feels deliberate" is a finding. Naming the problem precisely is what lets you brief the fix precisely. Builders who skip this step ship things that are *almost* good forever.

**Hold the line when it's inconvenient.** Slop ships because it compiles and it's 11pm. Every time you accept output you know is mediocre, you recalibrate your own bar downward — and you teach yourself that the bar was theater. The dangerous part of agents isn't that they produce slop; it's that they produce *plausible* slop faster than your discipline regenerates.

Concrete agent-era application: keep a "kill list" of things you never accept — for me that includes placeholder lorem data presented as real, copy-paste component-library decoration that doesn't match the design system, `transition: all`, fake testimonials, hedging copy. The agent learns your kill list through the contract file. Your taste literally becomes configuration.

## 7. When the model lies

Models don't lie maliciously; they lie *fluently*. Knowing the failure modes turns paranoia into a checklist:

**The hallucinated API.** The method that doesn't exist, the config key from a different library, the flag from a version three majors ago. Tell: code that reads perfectly but you can't find the symbol in the docs. Defense: typecheck everything; for anything unfamiliar, make the agent cite or fetch current docs before using them.

**The fabricated specific.** Stats, testimonials, user counts, "studies show." Agents fill empty slots in templates with plausible specifics — that's what they're for, structurally. Defense: a hard contract rule. Mine: unknown URL is `#`, unknown number is "—", unknown anything is honestly absent. No exceptions, even in mockups, because mockups ship.

**The phantom success.** "All tests pass" — no tests were run. "Deployed successfully" — the command errored above. Covered in chapter 5; the defense is the watch-it-run rule, applied without sentiment.

**The agreeable expert.** Push back on an agent and it folds instantly, even when it was right. Symmetrically, it will implement your bad idea without flagging it. Defense: ask for the case against your own plan before starting — explicitly. "What's wrong with this approach?" is the cheapest code review you'll ever get.

**The quiet scope creep.** You asked for a button fix; it refactored the file's imports, renamed two things, and "cleaned up" working code. Defense: diffs small enough to actually read, and a contract rule that unrequested changes get listed at the top of the summary.

The meta-rule: trust calibrated by cost. Boilerplate, you skim. Auth, payments, data deletion, anything touching other people's stuff — you read like it's your name on the incident report. Because it is.

## 8. Refactor or rot

Agent-written codebases rot in a particular way: nothing is ever *deleted*. Each session adds — another component, another helper, another CSS block — because adding is what generation does. Six months of pure vibes gives you four newsletter components, three unused loaders, and a dependency tree with a physics engine in it for a ball pit nobody shipped.

(Ask me how I know. The first version of my own studio site shipped three.js for an unused ball pit and 1,900 lines of copy-pasted CSS. The site you're reading this on is what survived the purge.)

The discipline is scheduled subtraction:

- **The dead code sweep.** Regularly — end of each project phase, or monthly — have the agent map what's actually imported and used, then delete the rest. Agents are *great* at this; it's mechanical and they don't get sentimental about their own output.
- **The dependency audit.** Every dep is a standing invitation to rot. If it's imported in one file you could write yourself, write it yourself.
- **The pattern merge.** When you notice three components doing the same job differently, stop and unify before adding a fourth. The agent will happily build the fourth; the contract has to be the thing that says no.

When do you stop vibing and actually read the code? Three triggers: when you're about to build on top of it, when it touches money or user data, and when the same area has produced two bugs. Two bugs from one corner means the model's mental model of that corner is wrong, and only reading it yourself will reveal how.

And sometimes the answer is the big one: a real refactor, planned like a feature with its own interview and loops. Boilerplate on top of broken code is still broken code — with better lighting.

## 9. Ship it scared

A product that's 80% done and live beats one that's 100% done and local, because only one of them can surprise you. Everything before shipping is hypothesis.

The solo-builder shipping stack, minimum viable version: a domain you own, a VPS or a deploy platform, HTTPS, and a way to see errors. That's it. With agents, the entire setup is a guided afternoon — infra config is one of the things they're flat-out best at, because it's all documented patterns. Self-hosting on a cheap VPS is more attainable than it has ever been: the agent writes the compose file, the reverse proxy config, the firewall rules, and explains every line if you ask. You should ask.

Pre-ship checklist, calibrated for one person — not a corporate launch gate:

- It builds clean, from scratch, on something that isn't your machine.
- The three flows that matter work when *you* click through them, slowly.
- Anything that takes user input validates it on the server.
- Secrets are in env vars and out of git history (check the history, not just the working tree).
- You can see errors after launch without ssh-ing in and grepping.

Then ship. The fear at the moment of shipping is not a signal something's wrong; it's the signal you're about to learn something. Scope the blast radius — soft launch, a Discord post, one tweet — and let real contact with reality replace your guesses. The roadmap after week one of being live is always better than the roadmap before, and you can't get it any other way.

## 10. Brand every room

Here's a thing solo builders get wrong because it feels efficient: stuffing every project under one personal brand, one color, one site, one voice. It reads as a portfolio. Portfolios are for getting hired. You're building products.

Give each project its own name, its own accent, its own one-line promise — even at version 0.1. Not a full identity system; a room of its own. My studio is red; the Discord bot that lives in it is sky blue and friendly; the food-creator startup is jade and calm. None of them borrow the red. The studio's job is to be the *house* — the brands bleed into it through their own panels, never the reverse.

Why this is worth the overhead:

- **Separable assets.** A named project can be sold, spun out, open-sourced, or killed without touching anything else. "The bot feature of my site" can't.
- **Multiplied attention.** Each brand is its own door for people to walk through. Each can be shared, remembered, and recommended independently. Five rooms beat one hallway.
- **Honest failure.** When a project dies — and most should — a named brand gets a respectful archive note. An unnamed feature quietly rots and makes the whole site feel stale.

The agent-era bonus: branding is now cheap. A name, a working accent color, a mark, a one-paragraph positioning statement — an afternoon with an agent that's read your kill list. The expensive part was never the artifacts; it was the deciding. This guide's chapter 4 interview works on brands too: who is it for, what does it never do, what should it feel like.

One rule: never fake the maturity. "Identity in development" on a case study page is honest and reads as momentum. A fabricated logo wall of press mentions reads as exactly what it is.

## 11. Build in the open

Building in the open is the only marketing channel where the work itself is the content. For a solo builder with no audience and no budget, it's not a strategy among many — it's the only one with compounding returns that starts at zero followers.

The mechanics, minus the influencer cosplay:

**The ship log.** Every loop from chapter 5 that produces something visible is a post: what you built, what broke, what you learned. Twenty seconds of screen recording beats a paragraph. The bar is "true and specific," not "impressive" — the audience for build-in-public is other builders, and they can smell inflated progress from orbit.

**The artifact trail.** Open-source the pieces that aren't your moat. A CLI tool, a component, a config setup. Each artifact is permanent, searchable proof that you ship — working for you while you sleep, which is more than any tweet does.

**The door.** Somewhere for the people who show up to *go* — for me, the Discord. A community of three real builders is not embarrassing; it's three people who will tell you the truth about your product before strangers pay to find out. Tend it like the product it is.

The compounding loop: ship → show → someone shows up → their question improves the product → ship again. Every other marketing channel decays when you stop paying. This one accumulates: the posts stay up, the repos stay green, the room slowly fills.

And the part that matters in the agent era: your *process* is now genuinely interesting content. How you run agents, your contract files, your failure stories — that's this guide, and it's also your distribution. Teaching what you do is the rare move that makes you better at it while marketing it.

## 12. The compounding studio

Everything in this guide compounds, and that's the actual thesis. One more contract rule, one more memory, one more shipped brand, one more reader of your ship log — each makes the next loop slightly cheaper. A solo builder with agents isn't a smaller version of a team. It's a different machine: one person's taste, multiplied by tireless executors, accumulating leverage in files.

The end state to build toward, concretely:

- **Your contract files** encode your standards so well that a fresh session produces work you'd accept from a good collaborator on the first pass.
- **Your memory** means no session starts from zero — the agent knows your infra, your kill list, your past decisions, your voice.
- **Your skills and automations** (whatever your tooling calls reusable procedures) capture every workflow you've debugged into something invocable. Solved problems stay solved.
- **Your brands** each hold their own room, so attention and revenue have multiple doors in.
- **Your public trail** sells the next thing before you've built it.

None of this requires more talent than you have right now. It requires the discipline to write things down, the patience to verify, and the stubbornness to keep your taste above your deadline. The tools will keep changing under us — this manual will update when they do — but the system survives every model release, because the system was never about the model.

Stay mad. Ship anyway.

— Samuel, samhc.us

---

*Guide 001 · Lifetime updates · Questions: the #guide channel in Samuel's Discord.*
