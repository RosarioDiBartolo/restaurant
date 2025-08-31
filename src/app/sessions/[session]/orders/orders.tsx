import { OrderItem as OrderItemType  } from "@/lib/types";
import OrderItem from "./order-item";
import { Button } from "@/components/ui/button";
import { Product, products } from "@/lib/products";


const getproduct = (name: string, category: string)=>{
  const product = products[category.toLowerCase()]?.find(p=>p.name === name)
 
  if (!product){
        throw `Strange product found in an order...  Name: ${name} Category: ${category} `;
   }

   return product
}

const findFinalPrice = (o: OrderItemType & {product: Product})=>o.quantity *(  (o.product.price + Object.entries( o.options ).map( ([k, v])=>  {

     const availableOptions = o.product.options?.[k]

    return  availableOptions?.find( option=> option.name === v)?.additivePrice || 0   
 } ) .reduce( (prev, v)=> (prev  + v), 0 )  ) ) 

export default function OrdersList({ session: { table, orders } }: { session: {table: number; orders: OrderItemType[]} }) {

 const OrdersProducts = orders.map( order =>( { ...order, product: getproduct( order.productName, order.category,) }))
 
 
 const finalOrders =  OrdersProducts.map( o=> ({finalPrice: findFinalPrice(o)  , ...o} ))
  const finalPrice =finalOrders.map(o=>o.finalPrice).reduce( (prev, New)=> prev + New, 0)
  return (
       <div className="p-3">
        <h1 className="text-2xl font-black text-center my-2">Ordini del tavolo {table}</h1>
        <ul className="flex flex-col gap-3">
          {finalOrders.map((order, i) => (
             <OrderItem  key={i} {...order} />
          ))}
        </ul>

        <Button 
         className=" w-full my-3 font-bold">
          Prezzo finale: {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(finalPrice  )   }
        </Button>
      </div>
   );
}
