"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker (`public/sw.js`) once, on mount.
 * Renders nothing. Silently no-ops where service workers are unavailable
 * (e.g. non-HTTPS origins other than localhost, or unsupported browsers).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Registration can fail on unsupported/insecure contexts — the app
          // still works fully online, so fail silently.
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
