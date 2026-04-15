import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { inviteClient } from "better-invite";

import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles }), inviteClient()],
});
