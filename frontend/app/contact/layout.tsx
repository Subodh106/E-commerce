import { Navbar } from '@/components/web/navbar'
import React from 'react'

export default function ContactLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
