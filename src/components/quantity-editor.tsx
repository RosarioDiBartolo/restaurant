import { Minus, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function QuantityEditor({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <Button
        type="button"
        variant="secondary"
        className="rounded-full !p-0 aspect-square "
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      >
        <Minus className="size-2" />
      </Button>

      <span>{quantity}</span>

      <Button
        type="button"
        variant="outline"
        className="rounded-full !p-0  aspect-square "
        onClick={() => setQuantity((q) => q + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </>
  );
}

export default QuantityEditor;
