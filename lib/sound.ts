/**
 * Tiny synthesized UI sounds via WebAudio. No audio assets to load, nothing
 * plays without a user gesture (callers only fire these from click handlers).
 */
export function playSuccessChime() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    // C5 then G5: a small, warm "you're in"
    [523.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      osc.start(now + i * 0.09);
      osc.stop(now + 0.7);
    });

    window.setTimeout(() => void ctx.close(), 1000);
  } catch {
    // audio is a garnish; never let it break the flow
  }
}
