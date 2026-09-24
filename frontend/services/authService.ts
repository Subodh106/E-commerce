import { api } from "@/lib/api";
import { logInUser, SignUpUser } from "@/Types/authTypes";

export const logIn = (data:logInUser)=>{
    return api.post("/auth/user/login",data)
}

export const registerUser = (data:SignUpUser)=>{
    return api.post("/auth/user/register",data);
}