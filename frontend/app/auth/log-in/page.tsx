"use client"
import { loginUserSchema } from '@/app/Schema/LoginUserSchema'
import { logInUser } from '@/app/Types/authTypes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldContent, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'



const LoginPage = () => {
  const{register , handleSubmit ,setError, formState:{errors},reset} = useForm<logInUser>({
      resolver : zodResolver(loginUserSchema),
      defaultValues:{
        email:"",
        password:""
      }
  });

  const handleLoginUser : SubmitHandler<logInUser> = async(data)=>{
    try{
        console.log(data);
        reset();
    }catch(error:any){
      setError("root",error.message || "Login failed")
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
            <Field>
                  
            </Field>
              {errors.root&&<FieldError>{errors.root.message}</FieldError>}
            </FieldGroup>
            <div className='flex justify-center'>
                  <Button className="w-fit cursor-pointer px-5" type='submit'>Log In</Button>
                </div>
          </form>
        </CardContent>
        <CardContent className='flex  justify-center'>
          <Link href="/auth/sign-up">
            <Button type='submit' className="cursor-pointer">Create an Account?</Button>
          </Link>
        </CardContent>
      </Card>
  )
}

export default LoginPage