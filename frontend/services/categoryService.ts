import { api } from "@/lib/api";

export type categoryType ={
    category : string
}

export const create_Category = (category:categoryType)=>{
    return api.post("/category",category);
}