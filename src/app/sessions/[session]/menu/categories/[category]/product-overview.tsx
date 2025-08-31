"use client";
import React, { useState } from "react";
import { OptionValue, Product } from "../../../../../../lib/products";
import {  SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"; 
 import { toast } from "sonner"; 
import { addOrder } from "@/app/client/session";
  
interface SelectedOptions {
  [key: string]: OptionValue;
}

function ProductOverview({
  productItem,
  category,
   sessionId
}: {
  productItem: Product;
  category: string;
   sessionId: string;
}) {
   const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => {
      if (!productItem.options) return {};
      const initial: SelectedOptions = {};
      Object.entries(productItem.options).forEach(([optionName, values]) => {
        initial[optionName] = values[0];
      });
      return initial;
    }
  );

  const finalPrice =
    productItem.price +
    Object.values(selectedOptions || {}).reduce(
      (acc, v) => acc + (v?.additivePrice || 0),
      0
    );

  const handleAddOrder = async () => {
    try {
      
      await addOrder(  sessionId, {
        productName: productItem.name,
        category: category,
        quantity: 1,
        options: Object.fromEntries(
          Object.entries(selectedOptions).map(([k, v]) => [k, v.name])
        ),
      });

      toast("Ordine aggiunto", {
        description: `${productItem.name} è stato aggiunto al carrello.`,
      });
    } catch (err) {
      toast("Errore", {
        description: "Non è stato possibile aggiungere l'ordine.",
      });

      console.error(err)
    }
  };

  return (
    <form 
    action={handleAddOrder}
    className="px-5 ">
 
      <Image
        className="mx-auto   rounded-3xl shadow-xl shadow-foreground/50"
        src={productItem.thumbnail ?? "https://picsum.photos/500/300"}
        width={500}
        height={300}
        alt={productItem.name}
      />
 

      {productItem.options &&
        Object.entries(productItem.options).map(([option, values]) => (
          <div key={option} className="mb-5">
            <h3 className="font-semibold text-lg mb-2">{option}</h3>
            <Select
            
              value={selectedOptions[option].name}
              onValueChange={(val) => {
                if (!productItem.options) return;
                const values = productItem.options[option];
                setSelectedOptions((prev) => ({
                  ...prev,
                  [option]: values.find((v) => v.name === val)!,
                }));
              }}
            >
              <SelectTrigger className="w-full   ">
                <SelectValue placeholder={`Seleziona ${option}`} />
              </SelectTrigger>
              <SelectContent className="  ">
                {values.map((optionValue) => (
                  <SelectItem key={optionValue.name} value={optionValue.name}>
                    {optionValue.name}{" "}
                    <span className="text-muted-foreground">
                      {optionValue.additivePrice
                        ? `(+€ ${optionValue.additivePrice
                            .toString()
                            .replace(".", ",")})`
                        : ""}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
    
      <SheetClose asChild>
        <Button size={"lg"} type="submit"    className=" font-bold w-full">
           {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(finalPrice  )}
        </Button>
      </SheetClose>
    </form>
  );
}

export default ProductOverview;
