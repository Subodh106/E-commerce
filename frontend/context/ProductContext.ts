"use client"

import { ProductType } from "@/Types/HomeTypes";
import { createContext } from "react";


export type ProductContextType = {
    products : ProductType[];
    setProducts : React.Dispatch<React.SetStateAction<ProductType[]>>;
    loading : boolean;
}

export const ProductContext = createContext<ProductContextType|null>(null);