"use client";

import { SiteHeader } from "@/components/site-header";

 import { Table as TableType } from "@/lib/types";
import Table from "./table-card";
import { where } from "firebase/firestore";
import { useCollection } from "@/hooks/firestore";

export default function DashboardHome() {
  const openedTables = useCollection<TableType >("tables", [where("open","==",true)]) ;
   return (
    <>
      <SiteHeader>
        <h1 className="text-base font-medium">Tavoli aperti</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
        </div>
      </SiteHeader>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="w-full  grid gap-6 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] p-4">
              {openedTables.map((tableRef) => (
                <Table table = {tableRef.fetch()} key={tableRef.id} />
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
