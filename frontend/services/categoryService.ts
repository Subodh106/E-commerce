import { api } from "@/lib/api";

export const create_Category = (category:string)=>{
    return api.post("/category",category);
}