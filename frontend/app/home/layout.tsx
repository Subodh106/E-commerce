"use client"
import { Footer } from "@/components/web/footer";
import { Navbar } from "@/components/web/navbar";
import { useRouter } from "next/router";


export default async function homeLayout  ({children}:{children:React.ReactNode}){
    return(
        <>
        <Navbar/>
        {children}
        <Footer/>
        </>
    )
}