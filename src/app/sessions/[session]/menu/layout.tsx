import React, { PropsWithChildren } from 'react'
import AlecciSection from './alecci-section'

function Layout({children}: PropsWithChildren) {
  return (
   <>
   
    <AlecciSection />
   {children}
   </>
  )
}

export default Layout