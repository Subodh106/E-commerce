"use client"

import { ProductContext } from "@/context/ProductContext"
import { getAllProducts } from "@/services/productService";
import { ProductType } from "@/Types/HomeTypes";
import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner";

export default function ProductProvider({children}:{children:React.ReactNode}){
    const[products , setProducts] = useState<ProductType[]>([]);
    const[loading , setLoading] = useState<boolean>(false);

    const fetchProducts = useCallback(async()=>{
        setLoading(true)
        try {
            const response = await getAllProducts({});
            setProducts(response?.data?.data ?? []);
        } catch (error:any) {
            console.log("Error in fetching products",error.message)
            toast.error(error?.response?.data?.message);
        }finally{
            setLoading(false)
        }
    },[])

    const value = useMemo(
        ()=>({
            products,
            setProducts,
            fetchProducts,
            loading
        }),
        [products,fetchProducts,loading]
    )
    
    return(
        <ProductContext.Provider value={value} >
            {children}
        </ProductContext.Provider>
    )
}