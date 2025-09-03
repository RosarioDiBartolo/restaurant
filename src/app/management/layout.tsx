import React, { PropsWithChildren } from "react";
import AuthProvider from "./auth-provider";
 

import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LoginRedirect from "./login-redirect";

export default async function ManagementLayout({
  children,
}: PropsWithChildren) {
 
  return (
    <AuthProvider>
      {/* <LoginRedirect>  */}
      <html lang="it">
        <body className="  flex min-h-screen flex-col  ">
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
      {/* </LoginRedirect> */}
    </AuthProvider>
  );
}
