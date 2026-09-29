import { api } from "@/lib/api";
import axios from "axios";
import { create } from "domain";

export type createProductType = {
  formDate : FormData;
  image : File
}

export const createProduct = async(createProduct : createProductType)=>{
    return api.post("/products",createProduct);
}