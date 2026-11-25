import { CategoryContext } from "@/context/CategoryContext";
import { useContext } from "react";

export function useCategories(){
    const context = useContext(CategoryContext);
    if(!context){
        throw new Error("useCategories must be used within a categoryProvider")
    }
    return context;
}