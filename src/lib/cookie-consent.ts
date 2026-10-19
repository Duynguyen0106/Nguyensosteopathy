/** Shared cookie-consent store for CookieBanner + MobileBookBar. */

export type Consent = "accepted" | "declined";

export const COOKIE_CONSENT_KEY = "nguyens-cookie-consent";

let consentVersion = 0;
const listeners = new Set<() => void>();

export function emitConsentChange() {
  consentVersion += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function readConsent(): Consent | null {
  try {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") return saved;
    return null;
  } catch {
    return null;
  }
}

export function getConsentSnapshot() {
  void consentVersion;
  return readConsent();
}

/** SSR / prerender: treat as decided so the banner is not shown in HTML. */
export function getServerConsentSnapshot(): Consent | null {
  return "declined";
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  emitConsentChange();
}
