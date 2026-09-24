import { api } from "@/lib/api"

export const AddToCart = (addToCartItems:{productId:string,quantity:number})=>{
    return api.post("/cart",{addToCartItems})
}