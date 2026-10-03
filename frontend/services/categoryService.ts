import { api } from "@/lib/api";

export type categoryType ={
    category : string
}

export const create_Category = (category:categoryType)=>{
    return api.post("/category",category);
}

export const getAllCateogry = ()=>{
    return api.get("/category");
}

export const delete_Category = (categoryId:number)=>{
    return api.delete(`/category/${categoryId}`)
}