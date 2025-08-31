"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

function HeaderLink({children, href}: PropsWithChildren<{href: string}>) {
      const pathname = usePathname()
    
    const active = pathname === href
    return (
        <Link
                href={href}
                className={`flex flex-col items-center gap-2  px-3 py-2 relative ${
                  active ? "bg-primary text-primary-foreground rounded-lg" : ""
                }`}
              >
                <div className={cn("p-2 rounded-full bg-primary text-primary-foreground", active && " bg-primary-foreground text-primary")}>
                  {children} 
                </div> 
              </Link>  )
}

export default HeaderLink