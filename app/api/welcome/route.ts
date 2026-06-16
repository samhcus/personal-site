import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const WELCOME_DIR = path.join(process.cwd(), "public", "welcome");

async function firstExisting(names: string[]): Promise<string | null> {
  for (const name of names) {
    try {
      await fs.access(path.join(WELCOME_DIR, name));
      return `/welcome/${name}`;
    } catch {
      // keep looking
    }
  }
  return null;
}

/**
 * Zero-config welcome widget backend: drop files into public/welcome/
 * and they go live on next request.
 *   intro.mp4 | intro.webm — the welcome video
 *   wave.mp4 | wave.webm | wave.gif — the looping bubble animation
 *   memoji.png — fallback bubble image
 *   memoji.gif — animated memoji, played while the avatar is hovered
 */
export async function GET() {
  const [video, wave, memoji, memojiGif] = await Promise.all([
    firstExisting(["intro.mp4", "intro.webm"]),
    firstExisting(["wave.mp4", "wave.webm", "wave.gif"]),
    firstExisting(["memoji.png"]),
    firstExisting(["memoji.gif"]),
  ]);

  return NextResponse.json(
    { video, wave, memoji, memojiGif },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
}
