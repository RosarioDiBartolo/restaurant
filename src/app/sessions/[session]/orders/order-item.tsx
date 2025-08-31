 
import {  Product} from "@/lib/products";
 import Image from "next/image";
import { OrderItem as OrderItemType } from "@/lib/types";

export const OptionPrice = ({product, optionValue, optionaName}:{ optionaName: string; optionValue: string;  product: Product }) => {
     const additivePrice = product.options?  product.options[optionaName].find( o => o.name === optionValue )?.additivePrice : 0

     return additivePrice && new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(additivePrice  )  
        }
function OrderItem(order: OrderItemType & {product: Product; finalPrice: number}) {
   
  return (
    <li className="rounded-2xl shadow-xl bg-gradient-to-bl from-background via-background to-amber-200">
      <div className="p-4 md:p-5 rounded-2xl text-foreground bg-gradient-to-l from-background to-background/60 flex flex-col md:flex-row gap-4 items-start">
        
        {/* Product Image */}
        {order.product.thumbnail && (
          <div className="flex-shrink-0 w-full md:w-32 h-32 relative rounded-xl overflow-hidden shadow-md">
            <Image
              src={order.product.thumbnail}
              alt={order.product.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Info Section */}
        <div className="flex-1 flex flex-col w-full justify-between gap-2">
          {/* Top Row: Name & Status */}
          <div className="flex justify-between items-start md:items-center">
            <h2 className="font-semibold text-lg">{order.productName}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "consegnato"
                  ? "bg-green-200 text-green-800"
                  : order.status === "in preparazione"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Middle Row: Category & Quantity */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <p>Categoria: <span className="font-medium">{order.category}</span></p>
            <p>Quantità: x <span className="font-medium">{order.quantity}</span></p>
          </div>

          {/* Options */}
          { order.product.options  && Object.keys(order.options).length > 0 && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Opzioni:</span>
              <ul className="ml-4 list-disc">
                {Object.entries(order.options).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value} <OptionPrice product={order.product} optionaName={key} optionValue={value} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
