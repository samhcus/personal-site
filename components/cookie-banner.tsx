"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem("cookie-consent", "dismissed");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm"
        >
          <div className="ck-card">
            <p className="ck-title">Cookie preferences</p>
            <p className="ck-description">
              We use cookies to improve your experience.{" "}
              <a href="#">Learn more</a>.
            </p>
            <div className="ck-actions">
              <button className="ck-pref" onClick={dismiss}>
                Preferences
              </button>
              <button className="ck-accept" onClick={accept}>
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
