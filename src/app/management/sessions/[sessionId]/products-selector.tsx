 import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { sessionsCollection } from "@/hooks/collection";
import { products } from "@/lib/products";
import { TableSession } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

function ProductsSelector( {session}: {session:TableSession}) {
   return (
    <div className=" max-w-full  max-h-[90vh]   overflow-y-scroll py-4  rounded-2xl">
     
      <Card className=" ">
        <CardContent className=" space-y-8"> 
      {Object.entries(products).map(([c, subProducts]) => (
        <section className="  " key={c} id={c}>
          <h4 className=" text-lg bg-secondary text-secondary-foreground border p-1 px-3 my-2 rounded-2xl capitalize font-semibold">{
            c
          }
          </h4>
          <ul className="snap-x max-w-full border rounded-2xl overflow-x-scroll  p-5 bg-primary   flex gap-6">
            {subProducts.map((product) => (
              <li className=" snap-center  " key={product.name}>
                <DialogClose 
                onClick={()=>{
                  sessionsCollection.updateDoc(session.id, {
                    orders: [...session.orders, {
                      productName: product.name, category: c, options: product.options ? Object.fromEntries( Object.entries( product.options ).map(([opt, values])=> [opt, values[0].name] ) ): {} , status: "in attesa", quantity: 1
                    } ]
                  })

                  toast(`Aggiunto ordine al tavolo ${session.table}`, {
                    description: `Prodotto aggiunto: ${product.name}, Categoria: ${c}`
                  })
                }}
                className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden shadow-xl shadow-black/60">
                  {product.thumbnail && (
                    <Image
                      fill
                      className=" h-full object-cover "
                      src={product.thumbnail}
                      alt={product.name || "Product image"}
                    />
                  )}
                </DialogClose>
              </li>
            ))}
          </ul>
        </section>
      ))}
      </CardContent>
      </Card>
    </div>
  );
}

export default ProductsSelector;
