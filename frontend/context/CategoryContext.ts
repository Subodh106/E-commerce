"use clinet"

import { Category } from "@/app/admin/categories/page"
import { categoryType } from "@/services/categoryService"
import { createContext } from "react"

export type CategoryContextType = {
    categories :Category[]
     setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export const CategoryContext = createContext<CategoryContextType|null>(null);