import * as z from "zod";

export const loginUserSchema = z.object({
    email:z.email(),
    password:z.string().min(2,"Password must be at least 2 character").max(15,"Password mustn't be greater than 15 character")
})