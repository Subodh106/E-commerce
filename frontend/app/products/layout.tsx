"use client"
import { Navbar } from '@/components/web/navbar'
import React from 'react'

export default function ProductLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        {children}
        </div>
  )
}
