import { z } from "zod";

/**
 * Username rules, shared by the forms and the server.
 *
 * Usernames are deliberately plain: lowercase letters and digits, starting with
 * a letter. Without capitals or separators there is exactly one way to write a
 * name, so two usernames can never look alike.
 */
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;

export const USERNAME_HINT = `${USERNAME_MIN_LENGTH}–${USERNAME_MAX_LENGTH} lowercase letters and numbers, starting with a letter.`;

export const USERNAME_TAKEN_MESSAGE = "That username is taken.";

/** Error code the server answers with when a username belongs to someone else. */
export const USERNAME_TAKEN_CODE = "USERNAME_IS_ALREADY_TAKEN";

export const usernameSchema = z
  .string()
  .min(1, "Username is required.")
  .regex(/^[a-z]/, "Username must start with a letter.")
  .regex(/^[a-z0-9]*$/, "Use lowercase letters and numbers only.")
  .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters.`)
  .max(USERNAME_MAX_LENGTH, `Username must be at most ${USERNAME_MAX_LENGTH} characters.`);

export function isValidUsername(username: string) {
  return usernameSchema.safeParse(username).success;
}

/**
 * Reduces free text to what a username may contain, so a field can filter
 * input as it is typed: "Jane Doe" becomes "janedoe".
 */
export function sanitizeUsername(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/^\d+/, "");
}
