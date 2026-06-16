import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazy Stripe client — never throws at import time, so the app builds and
 * runs without STRIPE_SECRET_KEY. Routes that need Stripe check for null
 * and respond 503 until the key is configured.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
  return client;
}
