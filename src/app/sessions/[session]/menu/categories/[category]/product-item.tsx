import React from "react";
import Image from "next/image";
import ProductOverview from "./product-overview";
export interface ProductItemProps {
  productItem: Product;
  category: string;
  session: TableSession;
}
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product } from "../../../../../../lib/products";
import { TableSession } from "@/lib/types";
 
export function ProductItem({
  productItem,
  session,
  category,
}: ProductItemProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <li
          key={productItem.name}
          className=" block p-1 active:scale-90 active:opacity-75 transition-all duration-300 rounded-2xl shadow-xl bg-gradient-to-bl from-amber-50 via-amber-50 to-amber-200 overflow-hidden"
        >
          <div className="p-5 rounded-2xl bg-gradient-to-l from-background to-background/60 flex product items-center justify-between gap-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden shadow-md">
              {productItem.thumbnail && (
                <Image
                  src={productItem.thumbnail}
                  alt={productItem.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {/* Info */}
            <div className="flex-1">
              <h3 className="font-bold text-xl">{productItem.name}</h3>
              <p className="text-sm  text-muted-foreground">
                {productItem.description}
              </p>
              <p className="mt-2 font-medium">
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "EUR",
                }).format(productItem.price)}
              </p>
            </div>
          </div>
        </li>
      </SheetTrigger>

      <SheetContent
        side="right"
        className=" h-screen flex flex-col w-full sm:w-[600px] py-8 pb-12 max-w-full overflow-y-auto"
      >
        <SheetHeader className="  ">
          <SheetTitle className="font-bold text-3xl">
            {productItem.name}
          </SheetTitle>
          <p className="text-lg font-semibold text-muted-foreground">
            {productItem.description}
          </p>
        </SheetHeader>
           <ProductOverview
            sessionId={session.id}
            category={category}
            productItem={productItem}
          />
       </SheetContent>
    </Sheet>
  );
}
