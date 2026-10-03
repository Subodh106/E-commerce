"use client"

import { Category } from '@/app/admin/categories/page'
import { CategoryContext } from '@/context/CategoryContext'
import React, { useState } from 'react'

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}