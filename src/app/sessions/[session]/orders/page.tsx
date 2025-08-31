import React from "react";
import Orders from "./orders";
import { getSessionById } from "@/app/actions/collections/sessions";

async function OrdersPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session: sessionId } = await params;
  const session = await getSessionById(sessionId);
  return (
    session && (
      <main className="   text-secondary-foreground flex-1">
        <Orders session={session} />{" "}
      </main>
    )
  );
}

export default OrdersPage;
