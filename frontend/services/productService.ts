import { api } from "@/lib/api"

export type pathVariablesType = {
    search :string,
    selectedCategory:string,
    price:number,
    page:number,
    direction:string,
    sortBy:string
}

export const getAllProducts = (pathVariables:pathVariablesType)=>{
    return api.get(`/products?search=${pathVariables.search}&category=${pathVariables.selectedCategory}&minPrice=10&maxPrice=${pathVariables.price}&size=9&page=${pathVariables.page}&direction=${pathVariables.direction}&sortBy=${pathVariables.sortBy}`);
}

export const getProductById = (productId:string)=>{
    return api.get(`products/${productId}`);
}