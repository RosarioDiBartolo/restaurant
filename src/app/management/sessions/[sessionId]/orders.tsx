import { OrderItem, OrderStatus, TableSession } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionValue, products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ShoppingBasket, XIcon } from "lucide-react";
import {
  SheetHeader,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { sessionsCollection } from "@/hooks/collection";
const statusValues = ["in attesa", "in preparazione", "consegnato"];
const StatusBadge = ({
  setStatus,
  status,
}: {
  status: OrderStatus;
  setStatus: (s: OrderStatus) => void;
}) => {
  return (
    <Badge
      onClick={(e) => {
        e.stopPropagation();
        const statusIndex = statusValues.findIndex((s) => s === status);
        const newStatus = statusValues[
          statusValues.length - 1 > statusIndex ? statusIndex + 1 : 0
        ] as OrderStatus;
        setStatus(newStatus);
      }}
      className={cn(
        "   !border border-primary capitalize absolute top-0 -translate-y-1/2 right-10         text-lg",
        status == "in attesa" &&
          "bg-background  border-primary text-foreground",
        status === "in preparazione" && "bg-accent text-accent-foreground",
        status == "consegnato" && "bg-secondary text-secondary-foreground"
      )}
    >
      {status}
    </Badge>
  );
};

interface SelectedOptions {
  [key: string]: OptionValue;
}
function OrderItemEdit({
  order,
  updateOrder,
}: {
  order: OrderItem;
  updateOrder: (newOrder: OrderItem | null) => void;
}) {
  const product = products[order.category.toLowerCase()].find(
    (p) => p.name === order.productName
  );
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    product && product.options
      ? Object.fromEntries(
          Object.entries(order.options).map(([k, v]) => [
            k,
            product?.options
              ? product?.options[k].find((ov) => ov.name === v) ||
                product?.options[k][0]
              : {
                  name: "unkown",
                },
          ])
        )
      : {}
  );
  useEffect(() => {
    updateOrder({
      ...order,
      options: Object.fromEntries(
        Object.entries(selectedOptions).map(([k, v]) => [k, v.name])
      ),
    });
  }, [selectedOptions]);

  return (
    <Card className="  relative ">
      <CardContent className="  ">
        <div className=" flex justify-between">
          <h3 className=" line-clamp-1   text-2xl font-bold">
            {order.productName}{" "}
            {/* <span className=" text-muted-foreground"> x {quantity}</span> */}
          </h3>
          <StatusBadge
            setStatus={(s) => updateOrder({ ...order, status: s })}
            status={order.status}
          />
        </div>
        <div className="flex my-4 flex-col  text-balance ">
          {product?.options ? (
            Object.entries(order.options).map(([option, value]) => (
              <div key={option} className="mb-6  ">
                <h3 className="font-semibold   text-lg mb-2">{option}</h3>
                <Select
                  value={selectedOptions[option].name}
                  defaultValue={value}
                  onValueChange={(val) => {
                    if (!order.options) return;
                    const values = product.options
                      ? product.options[option]
                      : [];
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option]: values.find((v) => v.name === val)!,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full text-xl     ">
                    <SelectValue placeholder={`Seleziona ${option}`} />
                  </SelectTrigger>
                  <SelectContent className="  ">
                    {product.options !== undefined &&
                      Object.values(product.options[option]).map(
                        (optionValue) => (
                          <SelectItem
                            key={optionValue.name}
                            value={optionValue.name}
                          >
                            {optionValue.name}{" "}
                            <span className="text-muted-foreground  ">
                              {optionValue.additivePrice
                                ? `(+€ ${optionValue.additivePrice
                                    .toString()
                                    .replace(".", ",")})`
                                : ""}
                            </span>
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>
            ))
          ) : (
            <p className=" text-sm text-muted-foreground">
              Nessuna opzione modificabile per questo prodotto
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const EditOrder = ({
  target,
  editOrderAction,
}: {
  target: OrderItem;
  editOrderAction: (newOrder: OrderItem | null) => void;
}) => {
  const [order, setOrder] = useState<OrderItem | null>(target);
  return (
    order && (
      <SheetContent
        side="right"
        className=" w-full sm:w-[600px] text-xl  max-w-full overflow-y-auto"
      >
        <SheetHeader className="  bg-secondary rounded-b-3xl text-secondary-foreground  text-center    ">
          <SheetTitle className=" py-4   text-inherit    text-3xl">
            Modifica ordine
          </SheetTitle>
          <SheetDescription className="  font-bold ">
            Questa azione modifichera l&apos;ordine e{" "}
            <span className=" text-destructive">
              {" "}
              non potra essere annullata dopo la conferma.{" "}
              <AlertCircleIcon className=" inline" />{" "}
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className=" p-4">
           <OrderItemEdit order={order} updateOrder={(o) => setOrder(o)} />
        </div>
        <SheetFooter>
          <div className="flex flex-col gap-6">
            <SheetClose asChild>
              <Button
                onClick={() => {
                  
                  editOrderAction(order);
                }}
                className=" w-full "
                type="submit"
              >
                Applica modifiche
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    )
  );
};

const OrderItemView = ({
  order,
  deleteOrder,
  openEditSheet,
  updateStatus,
}: {
  order: OrderItem;
  updateStatus: (status: OrderStatus) => void;
  openEditSheet: () => void;
  deleteOrder: () => void;
}) => {
  const options = Object.entries(order.options);
  const [DialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Card onClick={openEditSheet} className="   relative">
        <CardHeader className=" ">
          <StatusBadge setStatus={updateStatus} status={order.status} />

          <div className=" flex">
            <CardTitle className=" flex-1 text-2xl font-bold">
              {order.productName}{" "}
              {/* <span className=" text-muted-foreground"> x {quantity}</span> */}
            </CardTitle>
            <Button
              onClickCapture={(e) => {
                setDialogOpen(true);
                e.stopPropagation();
              }}
              variant={"outline"}
            >
              <XIcon />
            </Button>
          </div>

          <CardDescription>{order.category}</CardDescription>
        </CardHeader>
        <CardContent className="text-lg     ">
          {options.length > 0 ? (
            <ul className=" space-y-4">
              {options.map(([k, v]) => (
                <li key={k} className=" flex justify-between">
                  <span className=" font-bold"> {k} </span>
                  <Badge className={cn(
                    " border border-card-foreground   text-accent-foreground   px-3  text-md  font-semibold",
                    order.status === "in attesa" && " bg-background text-foreground",
                    order.status === "in preparazione" && "bg-accent text-accent-foreground",
                    order.status === "consegnato" && "bg-secondary text-secondary-foreground"
                  )}>
                    {v}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className=" text-sm text-muted-foreground">
              Nessuna opzione aggiuntiva
            </p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={DialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione eliminerà l&apos;ordine dal tavolo e non potrà
              essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteOrder();
            }}
          >
            <div className="flex justify-end gap-2 mt-4">
              <AlertDialogCancel>Annulla</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" variant={"destructive"}>
                  Elimina ordine
                </Button>
              </AlertDialogAction>
            </div>{" "}
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default function OrdersSheet({ session }: { session: TableSession }) {
  const [orderEditTarget, setOrderEditTarget] = useState<number | null>(null);

  const update = (data: Partial<TableSession>) =>
    sessionsCollection.updateDoc(session.id, data);
  return (
    <Sheet
      open={orderEditTarget !== null}
      onOpenChange={(v) => setOrderEditTarget((old) => (v ? old : null))}
    >
      <div className=" space-y-10 ">
        <h2
          className=" mx-auto   flex gap-2 items-center justify-center text-center p-2 rounded-3xl text-2xl      font-semibold 
         bg-primary text-primary-foreground"
        >
          Ordini
          <ShoppingBasket className=" inline" />
        </h2>
        {session.orders.map((order, index) => (
          <OrderItemView
            deleteOrder={() =>
              update({
                orders: session.orders.filter((o, i) => index !== i),
              })
            }
            updateStatus={(status) =>
              update({
                orders: session.orders.map((o, i) =>
                  index === i ? { ...o, status } : o
                ),
              })
            }
            openEditSheet={() => setOrderEditTarget(index)}
            order={order}
            key={index}
          />
        ))}
      </div>
      {orderEditTarget !== null && (
        <EditOrder
          editOrderAction={(newOrder) =>
            update({
              orders: session.orders
                .map((o, i) => (i === orderEditTarget ? newOrder : o))
                .filter((o) => o !== null),
            })
          }
          target={session.orders[orderEditTarget]}
        />
      )}
    </Sheet>
  );
}
