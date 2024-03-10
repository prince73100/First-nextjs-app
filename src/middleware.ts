import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublished = path ==='/signup'  || path === '/login' || path ==='/verifyemail'
    const token  =  request.cookies.get('token')?.value || ""
    if(isPublished && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    if(!isPublished && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
}