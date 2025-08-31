import { NextRequest, NextResponse } from "next/server"; 
import { headers } from "next/headers";
import { getOpenTable, } from "@/app/actions/collections/tables";

  
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
)  {
   const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const { id } = await params;
  
    const table = await getOpenTable(Number(id));
  

  if (table.lastSessionId) {
    return NextResponse.redirect(
      `${baseUrl}/sessions/${table.lastSessionId}/menu`
    );
  }

  // Valid table, redirect to menu start
  return NextResponse.redirect(`${baseUrl}/tables/${id}/menu`);
}
