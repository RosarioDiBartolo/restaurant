import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/products";
 
async function Menu({ params }: { params: Promise<{ session: string }> }) {
  const { session: sessionId } = await params;
  return (
    <>
      <main>
        <ul className="p-5 flex flex-col gap-3">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/sessions/${sessionId}/menu/categories/${ encodeURIComponent(category.name) }`}
                className="block p-1 active:scale-90 active:opacity-75 transition-all duration-300 rounded-2xl shadow-xl bg-gradient-to-bl from-amber-50 via-amber-50 to-amber-200"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-l from-background to-background/60 flex items-center justify-between gap-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden shadow-md">
                    {category.thumbnail && (
                      <Image
                        src={category.thumbnail}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-xl text-foreground font-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <ChevronRight />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Menu;
