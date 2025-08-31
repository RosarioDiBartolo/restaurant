"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {   Table, TableSession } from "@/lib/types";

import { findOrdersFinalPrice } from "@/lib/sessions";
import Link from "next/link";
import { DollarSignIcon, ShoppingCartIcon, TrendingUpIcon } from "lucide-react";
import { sessionsCollection } from "@/hooks/collection";
 function timeSince(date: Date) {
  const now = Date.now();
  const past = date.getTime();
  const seconds = Math.floor((now - past) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} anni fa`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mesi fa`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} giorni fa`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} ore fa`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minuti fa`;

  return "Adesso";
}
export default function TableCard({ table }: { table: Table }) {
  const docData = sessionsCollection.useDoc(table.lastSessionId)

  const session = docData.status === "exist"? docData.doc: null
 
  // Fake additional info
  const finalPrice = session?.orders
    ? findOrdersFinalPrice(session?.orders)
    : 0;

  return (
    session && (
      <Link href={`/management/sessions/${session.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 text-2xl">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="">Tavolo {session.table}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 mt-2">
            <div className="flex gap-4 flex-wrap">
              <Badge
                variant="outline"
                className="flex items-center gap-3 text-lg px-6 py-2"
              >
                <ShoppingCartIcon className="!size-5" /> {session.orders.length}{" "}
                {session.orders.length === 1 ? "Ordine" : "Ordini"}
              </Badge>
              <Badge
                variant="default"
                className="flex items-center gap-1 text-lg"
              >
                <DollarSignIcon className="!size-5" /> Totale €{" "}
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "EUR",
                }).format(finalPrice)}
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Aperto{" "}
              {session.createdAt
                ? timeSince(session.createdAt.toDate())
                : "Data sconosciuta"}
              <TrendingUpIcon className="w-4 h-4" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    )
  );
}
