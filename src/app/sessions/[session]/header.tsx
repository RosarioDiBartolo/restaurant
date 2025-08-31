import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { UtensilsCrossed, ShoppingBag } from "lucide-react";
 import OrdersBadge from "../../orders-bage";
import HeaderLink from "../../header-link";
import { TableSession } from "@/lib/types";

function Header({ session: { orders, id } }: { session: TableSession }) {
  return (
    <header className="w-full py-2 border-b-4 bg-gradient-to-br font-semibold bg-background text-foreground sticky top-0 z-50">
      <div className="container text-foreground mx-auto flex items-center justify-between px-4">
        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className=" gap-4">
            {/* Menu Link */}
            <NavigationMenuItem className="  flex flex-col items-center">
              <HeaderLink href={`/sessions/${id}/menu`}>
                <UtensilsCrossed className="text-inherit" />
              </HeaderLink>
              <span>Menu</span>
            </NavigationMenuItem>

            {/* Orders Link */}
            <NavigationMenuItem className=" flex flex-col items-center">
              <HeaderLink href={`/sessions/${id}/orders`}>
                <ShoppingBag className="  text-inherit" />
              </HeaderLink>
              <OrdersBadge
                className=" bg-accent text-accent-foreground"
                initalOrdersCount={orders.length}
                sessionId={id}
              />

              <span>My Orders</span>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Header;
