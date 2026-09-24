import { api } from "@/lib/api"

export const AddToCart = (addToCartItems:{productId:string,quantity:number})=>{
    return api.post("/cart",{addToCartItems})
}

export const fetchCart = ()=>{
    return api.get("/cart");
}

export const removeItemFromCart =(id:string)=>{
    return api.delete(`/cart/${id}`);
}

export const clearAllItemFromCart = ()=>{
    return api.delete(`/cart`);
}