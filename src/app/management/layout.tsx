import React, { PropsWithChildren } from "react";
import AuthProvider from "./auth-provider";
import { getSession } from "@/lib/auth/employe-session";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ManagementLayout({
  children,
}: PropsWithChildren) {
  const AuthSession = await getSession();
  if (!AuthSession) redirect("/auth/login");
  return (
    <AuthProvider>
      <html lang="it">
        <body className="  flex min-h-screen flex-col pb-12  ">
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
