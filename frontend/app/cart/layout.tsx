import { Footer } from '@/components/web/footer'
import { Navbar } from '@/components/web/navbar'
import React from 'react'

export default function CartLayout({children}:{children:React.ReactNode}) {
  return (
     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 antialiased">
        <Navbar/>
        {children}
        <Footer/>
     </div>
  )
}
