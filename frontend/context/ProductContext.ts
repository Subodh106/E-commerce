"use client"

import { pathVariablesType } from "@/services/productService";
import { ProductType } from "@/Types/HomeTypes";
import { createContext } from "react";


export type ProductContextType = {
    products : ProductType[];
    fetchProducts : (pathVariables:pathVariablesType)=>void;
    setProducts : React.Dispatch<React.SetStateAction<ProductType[]>>;
    loading : boolean;
}

export const ProductContext = createContext<ProductContextType|null>(null);