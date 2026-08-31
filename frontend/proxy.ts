import { NextRequest, NextResponse } from "next/server";

export function proxy(request : NextRequest){
    const {pathname} = request.nextUrl;
    const isAuthed = request.cookies.get("AUTH_COOKIE")?.value==="1";
    if(pathname.startsWith("/home")){
        if(!isAuthed){
            console.log("not home")
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname="/auth/log-in";
            loginUrl.searchParams.set("next" ,pathname);
            return NextResponse.redirect(loginUrl);
        }
    }
    if(pathname==="/auth/log-in" && isAuthed){
        console.log("home")
        const home = request.nextUrl.clone();
        home.pathname = "/home";
        return NextResponse.redirect(home);

    }
    return NextResponse.next();
}

export const config={
    matcher:["/home","/auth/log-in"]
}