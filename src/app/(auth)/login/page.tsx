import { Suspense } from "react";

import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  // LoginForm reads the callback URL from the search params, which needs a Suspense boundary.
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
