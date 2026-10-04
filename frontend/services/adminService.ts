import { api } from "@/lib/api";


export const createProduct = async(createProduct : FormData)=>{
    return api.post("/products",createProduct);
}
