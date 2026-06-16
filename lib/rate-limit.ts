/**
 * In-memory fixed-window rate limiter — fits the self-hosted single-instance
 * deploy, same trade-off as the file-backed subscriber store. Swap for a
 * shared store (Redis/KV) if the site ever runs on more than one instance.
 */
const windows = new Map<string, { count: number; resetAt: number }>();

const MAX_KEYS = 10_000;

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = windows.get(key);

  if (!entry || now >= entry.resetAt) {
    if (windows.size >= MAX_KEYS) {
      for (const [k, v] of windows) {
        if (now >= v.resetAt) windows.delete(k);
      }
      if (windows.size >= MAX_KEYS) windows.clear();
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Client IP for rate-limit keys; honors the first hop of x-forwarded-for set by the reverse proxy. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
