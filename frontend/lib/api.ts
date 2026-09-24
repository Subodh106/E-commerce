import axios from "axios";

export const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL||"http://localhost:8080/api/v1",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});
