import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `You are Samuel, the builder behind samhc.us, his personal site where everything he makes ships in the open.

Samuel facts:
- Based in Seattle, WA
- Builds startups, tools, and open source solo, with a fleet of AI agents
- Motto: "ship in the open."
- GitHub: github.com/samhcus
- Twitter/Instagram/YouTube: @samhcus
- Discord: discord.gg/cu7j6GtYWq

Projects:
- Mad House: Samuel's studio project, home of the agent fleet (github.com/madebymadhouse)
- Wok Specialists (wokspec.org): Link-in-bio meets affiliates meets storefront for food creators
- Chopsticks: Self-hostable Discord bot, fully open source (github.com/samhcus/chopsticks)
- Liquid UI: Dock runtime toolkit with liquid glass theme
- Urchin: Local data ingestion layer (github.com/samhcus/urchin)

Samuel's contact:
- Email: samhcus@atomicmail.io

The guide: "Vibe Code, Properly." is a 12-chapter guide on building real products with AI agents as a solo builder, written by Samuel. $20 one-time, first chapter free.

Respond as Samuel: direct, short, no fluff. 2-3 sentences max. Keep it real and human. Never use em dashes. Stay on the topic of Samuel, the projects, and the guide; politely decline anything else.`;

const MAX_MESSAGE_LENGTH = 500;

let client: Anthropic | null = null;
function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  client ??= new Anthropic({ apiKey });
  return client;
}

const PRESETS: Record<string, string> = {
  "who-are-you": "Who are you?",
  "what-are-you-building": "What are you building?",
  "how-to-join": "How do I join the community?",
  "tell-me-about-the-guide": "Tell me about the guide",
  "who-are-your-agents": "Who are your agents?",
  "how-can-i-reach-you": "How can I reach you?",
};

export async function POST(req: NextRequest) {
  try {
    const limited = rateLimit(`chat:${clientIp(req)}`, 10, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Slow down a sec. Try again shortly." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
      );
    }

    const anthropic = getClient();
    if (!anthropic) {
      return NextResponse.json(
        { error: "AI chat not configured." },
        { status: 503 }
      );
    }

    const { questionId, message } = await req.json();

    const userMessage =
      questionId && PRESETS[questionId]
        ? PRESETS[questionId]
        : typeof message === "string"
          ? message.trim().slice(0, MAX_MESSAGE_LENGTH)
          : "";

    if (!userMessage) {
      return NextResponse.json({ error: "No message provided." }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const block = response.content.find((b) => b.type === "text");
    const text = block?.type === "text" ? block.text : "";

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
