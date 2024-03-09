"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setbuttonDisabled] = React.useState(false)
    const handleonsignup = async () => {
        try {
            const resposeuser = await axios.post("/api/users/signup", user)
            console.log("successfull", resposeuser);
            router.push("/login")
        } catch (error:any) {
            console.log("soome thing is wrong", error);

        }

    }
    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false)
        }
        else {
            setbuttonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">SignUp</h1>
            <label htmlFor="username">username</label>
            <input
                id="username"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text" />
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
            <button onClick={handleonsignup}>{buttonDisabled ? "No signUp" : " signUp"}</button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}