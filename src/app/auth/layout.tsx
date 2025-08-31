import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <html lang="it">
      <body className=" bg-pattern  flex  justify-center items-center min-h-screen    ">
        {children}
      </body>
    </html>
  );
}

export default AuthLayout;
