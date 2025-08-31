"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { findOrdersFinalPrice } from "@/lib/sessions";
import React from "react";
import OrdersSheet from "./orders";
 import { useRouter } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  ArrowLeft, ShoppingCart } from "lucide-react";
import ProductsSelector from "./products-selector";
import { SiteHeader } from "@/components/site-header"; 
import Link from "next/link";
import { sessionsCollection, tablesCollection } from "@/hooks/collection";
function EditTable({ id }: { id: string }) {
  const docData = sessionsCollection.useDoc(id)
   const router = useRouter();

  if (docData.status === "missing") {
    return "No session found with this id";
  }

  const session = docData.status === "exist" ? docData.doc : undefined;
  
  // Fake additional info
  const finalPrice = session?.orders
    ? findOrdersFinalPrice(session?.orders)
    : 0;
  return (
    session && (
      <>
        <SiteHeader>
          
          <Button asChild className="" variant={"link"} size={"icon"}>
          <Link href={"/management"}> 
          <ArrowLeft  className=""/>
          </Link>
          </Button>
          
             <h1 className=" !text-md font-medium  "> 
               Ritorna alla pagina dei tavoli
            </h1> 
        </SiteHeader>
        <div className=" p-4 space-y-12">
          <div className=" flex justify-between ">
            <h1 className=" text-3xl font-semibold">Tavolo {session.table}</h1>
          </div>

          <OrdersSheet session={session} />
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} className=" w-full text-xl rounded-3xl">Aggiungi ordine</Button>
            </DialogTrigger>
            <DialogContent className=" max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className=" text-xl">
                  Aggiungi un nuove ordine al tavolo.
                </DialogTitle>
              </DialogHeader>

              <ProductsSelector session={session} />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                disabled={
                  !session.orders.every((o) => o.status === "consegnato")
                }
                className=" w-full"
              >
                Chiudi con il pagamento <ShoppingCart />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Questa azione chiuderà il tavolo e non potrà essere annullata.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  tablesCollection.updateDoc(session.table.toString(), {
                    open: false,
                  });
                  router.push("/management");
                }}
              >
                <div className="flex justify-end gap-2 mt-4">
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button className=" bg-destructive" type="submit" variant={"destructive"}>
                      Chiudi tavolo 
                    </Button>
                  </AlertDialogAction>
                </div>{" "}
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </>
    )
  );
}

export default EditTable;
