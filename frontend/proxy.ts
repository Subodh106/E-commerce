"use server"
import { NextRequest, NextResponse } from "next/server";
export function proxy(request : NextRequest){
    const {pathname} = request.nextUrl;
    const isAuthed = request.cookies.get("token")?.value;

    const protectedRoute = ["/home","/products"]

    console.log(isAuthed);

    const isProtectedRoutes = protectedRoute.some((route:string)=>pathname.startsWith(route))
  
    if(isProtectedRoutes && isAuthed==undefined){
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/log-in";
        loginUrl.searchParams.set("next" , pathname);
        return NextResponse.redirect(loginUrl)
    }

    if(pathname.startsWith("/log-in") && isAuthed!=null){
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = "/home";
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();

}
export const config={
    matcher:["/home/:path*",
        "/log-in/:path*",
        "/products/:path*"],
}