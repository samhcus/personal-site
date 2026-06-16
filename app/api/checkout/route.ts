import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { GUIDE } from "@/lib/guide";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limited = rateLimit(`checkout:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't open yet." },
      { status: 503 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: GUIDE.price * 100,
            product_data: {
              name: GUIDE.title,
              description: GUIDE.subtitle,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/guide?purchased=1`,
      cancel_url: `${origin}/guide`,
      metadata: { product: "guide-001" },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout couldn't start. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] session create failed:", err);
    return NextResponse.json(
      { error: "Checkout couldn't start. Try again." },
      { status: 502 }
    );
  }
}
