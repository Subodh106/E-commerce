import * as z from "zod";


export const SignUpUserSchema = z.object({
    email:z.email(),
    username:z.string().min(3,"Username must be at least 3 character").max(10 , "Username mustn't be greater than 3 character"),
    password:z.string().min(2,"Password must be at least 2 character").max(15,"Password mustn't be greater than 15 character")
})