"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const router = useRouter();
    const [buttondisabled, setbuttonDisabled] = useState(false)
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const handleLogin = async () => {
       try {
         const loginUser = await axios.post("/api/users/login", user)
         console.log("login successfully",loginUser);
         router.push("/profile")
         
       } catch (error) {
        console.log("login failed",error);
        
       }

    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">SignUp</h1>
            <label htmlFor="email">email</label>
            <input
                id="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email" />
            <label htmlFor="password">password</label>
            <input
                id="password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password" />
            <button onClick={handleLogin}>{buttondisabled?"Login":"No login"}</button>
            <Link href="/signup">visit signUp page</Link>
        </div>
    )
}