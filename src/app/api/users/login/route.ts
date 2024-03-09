import connect from "@/dbconfig/dbconfig";
import bcryptjs from "bcryptjs"
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json()
        const { email, password } = reqbody
        // user verify
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User does not exist", status: 400 })
        }
        // password check
        const checkpassword = bcryptjs.compare(password,user.password)
        if(!checkpassword){
            return NextResponse.json({error:"Invalid credential"})
        }
        const tokenData={
            id:user._id,
            email:user.email,
            username:user.username
        }
        const token = jwt.sign(tokenData,process.env.SECERET_KEY!,{expiresIn:"1d"})
    
        const response = NextResponse.json({message:"LoginSuccessfully",success:true})
    
        const option={
            httpOnly:true
        }
         response.cookies.set("token",token,option)
         return response;
    
    } catch (error) {
        return NextResponse.json({error:error,status:500})
    }
}