import type { Metadata } from "next";
import { siteConfig } from "../../config";
import Header from "./header";
import { ReactNode } from "react";
import Footer from "@/app/sessions/[session]/footer";
import { getSessionById } from "@/app/actions/collections/sessions";
import { notFound } from "next/navigation";

export default async function SessionLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ session: string }>;
}) {
  const { session: sessionId } = await params;

  const session = await getSessionById(sessionId);
  if (!session){
    return notFound();
  }
  return (
    <html lang="it">
      <body className="bg-pattern     ">
        <div className="min-h-svh flex flex-col "> 
             <Header session={session} />
            {children}
            </div>
           <Footer />
       </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
  metadataBase: new URL("https://alecci.it"),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: "https://alecci.it",
    siteName: siteConfig.name,
    locale: "it_IT",
    type: "website",
  },
};
