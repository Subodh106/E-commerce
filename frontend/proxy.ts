"use server"
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { isatty } from "tty";

export function proxy(request : NextRequest){
    const {pathname} = request.nextUrl;
    const isAuthed = request.cookies.get("token")?.value=="1";
    console.log(request.cookies.get("token"))
  
    if(pathname.startsWith("/home") && !isAuthed){
            console.log("not home")
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname="/auth/log-in";
            loginUrl.searchParams.set("next" ,pathname);
            return NextResponse.redirect(loginUrl);
      
    }
    if(pathname ==="/products" && !isAuthed){
      
            console.log(request.cookies.get("token"));
            console.log("products");
            const productsUrl = request.nextUrl.clone();
            productsUrl.pathname = "/auth/log-in";
            productsUrl.searchParams.set("next",pathname);
            return NextResponse.redirect(productsUrl);
    }
    if(pathname==="/auth/log-in" && !isAuthed){
        console.log("home")
        const home = request.nextUrl.clone();
        home.pathname = "/home";
        return NextResponse.redirect(home);

    }
    return NextResponse.next();
}

export const config={
    matcher:["/home/:path","/auth/log-in"]
}