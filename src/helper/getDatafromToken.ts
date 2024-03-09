import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export function getDataFromToken(request: NextRequest) {
    try {
        const encodedToken = request.cookies.get('token')?.value || " ";
        const decodedToken: any = jwt.verify(encodedToken, process.env.SECERET_KEY!)
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }

}