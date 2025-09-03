
import { Product, products, categories } from "./products"
import { OrderItem as OrderItemType  } from "./types"


export const getproduct = (name: string, category: string)=>{
  const ExistingCategory = categories.find( c=> c.name === category)
if (!ExistingCategory){
        throw `Strange category found in an order...   Category: ${category} `;
   }
    const product = products[category.toLowerCase()]?.find(p=>p.name === name)
 
  if (!product){
        throw `Strange product found in the "${category}" category... Name: ${name}`;
   }

   return product
}

export const findOrderFinalPrice = (o: OrderItemType & {product: Product})=>o.quantity *(  (o.product.price + Object.entries( o.options ).map( ([k, v])=>  {

     const availableOptions = o.product.options?.[k]

    return  availableOptions?.find( option=> option.name === v)?.additivePrice || 0   
 } ) .reduce( (prev, v)=> (prev  + v), 0 )  ) ) 

export  const findOrdersFinalPrice = (orders: OrderItemType[])=>{

 const OrdersProducts = orders.map( order =>( { ...order, product: getproduct( order.productName, order.category,) }))
 
  const finalOrders =  OrdersProducts.map( o=> ({finalPrice: findOrderFinalPrice(o)  , ...o} ))
  const finalPrice =finalOrders.map(o=>o.finalPrice).reduce( (prev, New)=> prev + New, 0)
   return finalPrice
 }

 