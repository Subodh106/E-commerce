import { api } from "@/lib/api"

export const AddToCart = (addToCartItems:{productId:number,quantity:number})=>{
    console.log("cart deatils",addToCartItems)
    return api.post("/cart",addToCartItems)
}

export const fetchCart = ()=>{
    return api.get("/cart");
}

export const removeItemFromCart =(id:number)=>{
    return api.delete(`/cart/${id}`);
}

export const clearAllItemFromCart = ()=>{
    return api.delete(`/cart`);
}

export const increase = (cartItemId : number)=>{
    return api.patch(`/${cartItemId}/increase`)
}