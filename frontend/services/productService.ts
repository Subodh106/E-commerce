import { api } from "@/lib/api"

export type pathVariablesType = {
    search? :string,
    selectedCategory?:string,
    price?:number,
    page?:number,
    direction?:string,
    sortBy?:string
}

export const getAllProducts = (pathVariables:pathVariablesType)=>{
    return api.get(`/products`,{params:pathVariables});
}

export const getProductById = (productId:number)=>{
    return api.get(`products/${productId}`);
}