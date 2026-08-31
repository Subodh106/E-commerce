"use client"
import { Button } from '@/components/ui/button'
import { CardHeader,Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { FieldContent, FieldGroup, Field,FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpUserSchema } from '@/Schema/SignUpUserSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import axios from 'axios'
import {
  useForm,
  type Resolver,
  type SubmitHandler,
  } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const { handleSubmit, register ,setError , formState:{errors} ,reset} = useForm<z.infer<typeof SignUpUserSchema>>({
    resolver: zodResolver(SignUpUserSchema),
    defaultValues:{
      email:"",
      username:"",
      password:""
    }
  })

  const router = useRouter();

  const handleSignUpUser:SubmitHandler<z.infer<typeof SignUpUserSchema>> = async(data)=>{
      try{
      console.log(process.env.NEXT_PUBLIC_SPRING_API_URL)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/auth/user/register`,data);
        console.log(res);
        reset();
        router.push("/home")
    }catch(error:any){
      setError("root",{ type:"server",message: error?.response?.data?.message || "Login failed"})
    }
  }
  return (
    <Card >
      <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Create your account with your email
          </CardDescription>
      </CardHeader>
      <CardContent >
        <form onSubmit={handleSubmit(handleSignUpUser)}>
          <FieldGroup>
            <Field>
              <FieldContent>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='example@gmail.com'
                  required
                  {...register('email')}
                />
              </FieldContent>
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <FieldContent>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='username'
                  placeholder='example'
                  required
                  {...register('username')}
                />
              </FieldContent>
              {errors.username && <FieldError>{errors.username.message}</FieldError>}
            </Field>
            <Field>
              <FieldContent>
                <Label htmlFor='passwrod'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='******'
                  required
                  {...register('password')}
                />
              </FieldContent>
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>
            <Field className='text-center'>
              {errors.root&&<FieldError>{errors.root.message}</FieldError>}
            </Field>
          </FieldGroup>
          
          <div className='flex justify-center items-center '>
            <Button type='submit' className="flex justify-center px-5 mt-4 cursor-pointer">Sign Up</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center items-center flex-col gap-2'>
        <CardDescription>Already have an account?</CardDescription>
        <Link href="/auth/log-in">
          <Button variant="outline" className="cursor-pointer">Log In</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SignUpPage

