import { Avatar, Style } from "@dicebear/core";
import lineFace from "@dicebear/styles/line-face.json";

/**
 * User avatars are DiceBear "Line Face" drawings: a face in a few pen strokes,
 * which suits the handwritten wordmark, on backgrounds from the site's warm
 * palette. They are generated in the browser from a seed, so nothing is
 * stored or fetched and the same seed always gives the same face.
 *
 * The generator is sizeable. Import this module only from code that is loaded
 * for signed-in users or on account screens, never from the shared layout.
 */
const style = new Style(lineFace);

const OPTIONS = {
  backgroundColor: ["#ecdfc6", "#dcc294", "#e6c7ae", "#d3d9c2", "#dcd6c9", "#e8d2ca", "#cfd8d9"],
  inkColor: ["#1a1917"],
  // Every mouth but the frown: nobody should be handed a sad face.
  mouthVariant: ["smile", "soft", "smirk", "line", "pleased", "wavy", "shy"],
} as const;

/** The avatar for a seed, as an SVG data URI. */
export function createAvatarUri(seed: string) {
  return new Avatar(style, { ...OPTIONS, seed }).toDataUri();
}

/** What a user's avatar is drawn from: their username, or their id until they pick one. */
export function getAvatarSeed(user: { id: string; username?: string | null }) {
  return user.username || user.id;
}
