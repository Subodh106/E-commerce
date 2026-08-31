"use client"
import { loginUserSchema } from '@/Schema/LoginUserSchema'
import { logInUser } from '@/Types/authTypes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldContent, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import  * as z from "zod";
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const{register , handleSubmit ,setError, formState:{errors},reset} = useForm<logInUser>({
      resolver : zodResolver(loginUserSchema),
      defaultValues:{
        email:"",
        password:""
      }
  });

  const router = useRouter();

  const handleLoginUser : SubmitHandler<z.infer<typeof loginUserSchema>> = async(data)=>{
    try{
      console.log(process.env.NEXT_PUBLIC_SPRING_API_URL)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/auth/user/login`,data);
        if(res.status==200){
          toast.success("Login successfully")
        }
        reset();
        router.push("/home")
    }catch(error:any){
     setError("root", {type:"server",message:error?.response?.data?.message || "Login failed"})  
    }
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLoginUser)}>
            <FieldGroup>
              <Field>
              <FieldContent>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='example@gmail.com'
                  required
                  {...register("email")}
                />
                {errors.email&&<FieldError>{errors.email.message}</FieldError>}
              </FieldContent>
            </Field>
            <Field>
              <FieldContent>
                <Label htmlFor='password'>Password</Label>
                <Input 
                  id='password'
                  type='password'
                  placeholder='*******'
                  required
                  {...register("password")}
                />
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </FieldContent>
            </Field>
            <Field className='flex items-center justify-center text-center'>
                  {errors.root&&<FieldError>{errors.root.message}</FieldError>}
            </Field>
              
            </FieldGroup>
            <div className='flex justify-center'>
                  <Button className="w-fit cursor-pointer px-5" type='submit'>Log In</Button>
                </div>
          </form>
        </CardContent>
        <CardFooter className='flex  justify-center flex-col items-center gap-3'>
          <CardDescription>Create an account?</CardDescription>
          <Link href="/auth/sign-up">
            <Button variant="outline" type='submit' className="cursor-pointer">Sign Up</Button>
          </Link>
        </CardFooter>
      </Card>
  )
}

export default LoginPage