import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const STORE = path.join(process.cwd(), "data", "subscribers.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Serialize read-modify-write cycles so concurrent signups can't drop each other.
let writeChain: Promise<unknown> = Promise.resolve();

type Subscriber = {
  email: string;
  source: string;
  subscribedAt: string;
};

async function readStore(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(STORE, "utf8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

/**
 * File-backed subscriber store — fits a self-hosted single-instance deploy.
 * Swap the body of this handler for an ESP API call when one is chosen;
 * the client contract ({ email, source } → { ok, already }) stays the same.
 */
export async function POST(req: Request) {
  const limited = rateLimit(`subscribe:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const source = typeof body.source === "string" ? body.source.slice(0, 32) : "newsletter";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a real email address." }, { status: 400 });
  }

  const result = writeChain.then(async () => {
    const subscribers = await readStore();
    if (subscribers.some((s) => s.email === email)) {
      return { ok: true, already: true };
    }

    subscribers.push({ email, source, subscribedAt: new Date().toISOString() });
    await fs.mkdir(path.dirname(STORE), { recursive: true });
    const tmp = `${STORE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(subscribers, null, 2), "utf8");
    await fs.rename(tmp, STORE);
    return { ok: true, already: false };
  });
  writeChain = result.catch(() => {});

  try {
    return NextResponse.json(await result);
  } catch (err) {
    console.error("[subscribe] store write failed:", err);
    return NextResponse.json(
      { error: "Couldn't save that right now. Try again." },
      { status: 500 }
    );
  }
}
