"use client";

// Shared client-side location helpers used by both the units page and the
// chat location banner. Location itself lives server-side in the session
// (POST /location); here we only track, in localStorage, whether the current
// session already has a location set — so the chat banner doesn't nag a user
// who already shared it (e.g. from the units page).

const LOCATION_SET_PREFIX = "saude-em-dia:location_set:";

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocalização não é suportada neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  });
}

export function markLocationSet(sessionId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCATION_SET_PREFIX + sessionId, "1");
  } catch {
    // localStorage unavailable (private mode / disabled) — non-fatal.
  }
}

export function hasLocationSet(sessionId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LOCATION_SET_PREFIX + sessionId) === "1";
  } catch {
    return false;
  }
}
