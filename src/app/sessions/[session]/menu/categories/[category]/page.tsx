import { notFound } from "next/navigation";
import { products, categories } from "../../../../../../lib/products";
 
import { ProductItem } from "./product-item";
import { Toaster } from "@/components/ui/sonner"
import { getSessionById } from "@/app/actions/collections/sessions";
 
type CategoryPageProps = {
  params: Promise<{ category: string, session: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam , session: sessionId} = await params;
  const decodedCategory = decodeURIComponent(categoryParam)
   const session = await getSessionById(sessionId)

  const category = categories.find(
    (c) => c.name  === decodedCategory
  );
    console.log(category)

  if (!category) {
    return notFound();
  }

 
  // Recupero i prodotti
  const productItems =
    products[ category.name.toLowerCase()  as keyof typeof products] || [];

  return (
      session && 
      <main className=" ">
        {/* Lista prodotti */}
        <Toaster />
        <ul className="p-5 flex flex-col gap-3  ">
          {productItems.map((item) => (
            <ProductItem session ={session} category={categoryParam} key={item.name} productItem={item} />
          ))}
        </ul>
        
      </main>
   );
}
