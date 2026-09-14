import React from 'react'

const BreadCrumb = () => {
  return (
     <div className="mx-auto max-w-7xl px-5 pt-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900">Shop</span>
        </div>
      </div>
  )
}

export default BreadCrumb