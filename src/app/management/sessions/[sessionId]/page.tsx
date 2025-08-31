import { getSessionById  } from '@/app/actions/collections/sessions';
import { getTable } from '@/app/actions/collections/tables';
 
import React from 'react'
import EditSession from './edit-session';
import { redirect } from "next/navigation";

async function Table({params}:{
    params: Promise<{
        sessionId: string;
    }>
}) {

    const { sessionId } = await params


    const session = await getSessionById(sessionId)
    const table = session &&  await getTable( session?.table)
    console.log({table})
    if ( !table?.open){
      redirect("/management")
    }
  return (
    <>
     
    <EditSession id = {sessionId}   />
 </>
    
  )
}

export default Table