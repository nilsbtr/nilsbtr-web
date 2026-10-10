import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { inviteClient } from "better-invite";

import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles }), usernameClient(), inviteClient()],
});

export type SessionUser = typeof authClient.$Infer.Session.user;
