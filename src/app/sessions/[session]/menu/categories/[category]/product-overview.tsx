"use client";
import React, { useState } from "react";
import { OptionValue, Product } from "../../../../../../lib/products";
import { SheetClose } from "@/components/ui/sheet";
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
  sessionId,
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
      await addOrder(sessionId, {
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

      console.error(err);
    }
  };

  return (
    <form action={handleAddOrder} className="px-5 flex-1 flex flex-col gap-8 ">
      <Image
        className="flex-1 object-cover outline-4 outline-primary outline-offset-4   rounded-3xl shadow-xl shadow-foreground/50"
        src={productItem.thumbnail ?? "https://picsum.photos/500/300"}
        width={500}
        height={300}
        alt={productItem.name}
      />

      <div className="  space-y-5">
        {productItem.options &&
          Object.entries(productItem.options).map(([option, values]) => (
               <Select
               key={
                option
               }
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
                 
  <label className="font-semibold text-accent-foreground block my-2 px-3 bg-gradient-to-tr from-accent to-accent/50 rounded-md      w-fit p-1   ">
                  {option}
                  </label>
                <SelectTrigger className="  font-semibold relative border-0 data-[state=open]:ring-2 shadow-lg bg-gradient-to-tr from-background to-accent/20      text-accent  w-full   ">
                 
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
           ))}
      </div>

      <SheetClose asChild>
        <Button size={"lg"} type="submit" className=" my-5 font-bold w-full">
          Aggiungi ordine:{" "}
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(finalPrice)}
        </Button>
      </SheetClose>
    </form>
  );
}

export default ProductOverview;
