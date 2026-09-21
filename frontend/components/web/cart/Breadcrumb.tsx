import { ChevronRight } from 'lucide-react'
import React from 'react'

export default function Breadcrumb() {
  return (
       <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <a href="/home" className="hover:text-indigo-600">Home</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="/products" className="hover:text-indigo-600">Shop</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Shopping Cart</span>
        </div>
  )
}
