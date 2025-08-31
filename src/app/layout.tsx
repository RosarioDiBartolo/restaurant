import "./globals.css"
import   { PropsWithChildren } from 'react'

function layout({children}: PropsWithChildren) {
  return (
    <>{children}</>
  )
}

export default layout