/*
 * Just enough user-agent reading to tell an administrator which of a user's
 * sessions is which. Order matters in both lists: Edge and Opera also claim to
 * be Chrome, and Chrome also claims to be Safari.
 */
const BROWSERS: readonly [RegExp, string][] = [
  [/Edg(?:e|A|iOS)?\//, "Edge"],
  [/OPR\/|Opera/, "Opera"],
  [/Firefox\/|FxiOS\//, "Firefox"],
  [/Chrome\/|CriOS\//, "Chrome"],
  [/Safari\//, "Safari"],
];

const SYSTEMS: readonly [RegExp, string][] = [
  [/iPhone|iPad|iPod/, "iOS"],
  [/Android/, "Android"],
  [/Windows/, "Windows"],
  [/Macintosh|Mac OS X/, "macOS"],
  [/CrOS/, "ChromeOS"],
  [/Linux/, "Linux"],
];

const MOBILE = /Mobi|Android|iPhone|iPad|iPod/;

function match(userAgent: string, candidates: readonly [RegExp, string][]) {
  return candidates.find(([pattern]) => pattern.test(userAgent))?.[1];
}

/** A short description of the device behind a user agent, like "Chrome on Windows". */
export function describeUserAgent(userAgent: string | null) {
  const browser = userAgent ? match(userAgent, BROWSERS) : undefined;
  const system = userAgent ? match(userAgent, SYSTEMS) : undefined;

  return {
    label: browser && system ? `${browser} on ${system}` : (browser ?? system ?? "Unknown device"),
    isMobile: userAgent ? MOBILE.test(userAgent) : false,
  };
}
