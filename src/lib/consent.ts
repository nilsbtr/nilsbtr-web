import { useSyncExternalStore } from "react";

/**
 * The visitor's answer to the analytics prompt. Analytics read details of the
 * visitor's device, which German law (§ 25 TDDDG) and the GDPR only allow with
 * consent, so nothing is measured until this says "granted".
 *
 * The answer is kept in the browser's local storage, which is itself exempt
 * from consent: it only remembers a choice the visitor made.
 */
export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "analytics-consent";

/**
 * Raise when what the prompt asks for changes, e.g. a new analytics provider.
 * Answers given to an older version are discarded and the visitor is asked again.
 */
const CONSENT_VERSION = 1;

/** Consent is asked for again after a year, as German regulators recommend. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

type StoredConsent = { choice: ConsentChoice; version: number; decidedAt: number };

const listeners = new Set<() => void>();

/** Holds the answer when local storage can't. */
let memoryFallback: ConsentChoice | null = null;

function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== "object" || value === null) return false;
  const { choice, version, decidedAt } = value as Record<string, unknown>;
  return (
    (choice === "granted" || choice === "denied") &&
    version === CONSENT_VERSION &&
    typeof decidedAt === "number" &&
    Date.now() - decidedAt < MAX_AGE_MS
  );
}

/** The current answer, or null while the visitor hasn't given one. */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored: unknown = JSON.parse(raw);
    return isStoredConsent(stored) ? stored.choice : null;
  } catch {
    return null;
  }
}

/** Records an answer, or clears it with null so the prompt is shown again. */
export function setConsent(choice: ConsentChoice | null) {
  try {
    if (choice) {
      const stored: StoredConsent = { choice, version: CONSENT_VERSION, decidedAt: Date.now() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage can be unavailable, e.g. in private windows. The answer then
    // lasts for this page only, and analytics stay off once it is gone.
    memoryFallback = choice;
  }
  for (const listener of listeners) listener();
}

function getSnapshot() {
  return readConsent() ?? memoryFallback;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps other open tabs in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The visitor's answer: undefined while it can't be known yet (on the server
 * and during hydration), null until they have answered.
 */
export function useConsent(): ConsentChoice | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

/** Whether analytics may run right now. Checked again before every event is sent. */
export function hasAnalyticsConsent() {
  return getSnapshot() === "granted";
}
