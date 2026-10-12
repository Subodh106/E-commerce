import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";

export function useProducts(){
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProducts must be used within a productProvider")
    }
    return context;
}