"use client"

import { Category } from '@/app/admin/categories/page'
import { CategoryContext } from '@/context/CategoryContext'
import { getAllCateogry } from '@/services/categoryService'
import axios from 'axios'
import React, { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading , setLoading] = useState<boolean>(false);

  const fetchCategories = useCallback(async()=>{
      setLoading(true);
      try {
        const response = await getAllCateogry();
        setCategories(response?.data?.data);
      } catch (error:any) {
        console.log("Error fetchiong categories",error);
        toast.error(error?.response?.data?.message);
      }finally{
        setLoading(false);
      }
  },[]);

const value = useMemo(
  ()=>({
    categories,
    setCategories,
    fetchCategories,
    loading
  }),
  [categories,fetchCategories,loading]
)

  return (
    <CategoryContext.Provider
      value={value} 
    >
      {children}
    </CategoryContext.Provider>
  )
}