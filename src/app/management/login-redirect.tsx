import { getSession } from "@/lib/auth/employe-session";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

async function LoginRedirect({ children }: PropsWithChildren) {
  const AuthSession = await getSession();
  if (!AuthSession) redirect("/auth/login");

  return <>{children}</>;
}

export default LoginRedirect;
