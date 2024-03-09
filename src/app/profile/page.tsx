"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function Profile() {
    const router = useRouter()
    const [data, setdata] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")

        } catch (error: any) {
            console.log(error.message);
        }
    }
    const getuserDetail = async () => {
        const userData= await axios.get("/api/users/me")
        console.log(userData.data.data._id);
        setdata(userData.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>profile page </p>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button className="mt-4" onClick={logout}>Logout</button>
            <button className="mt-4" onClick={getuserDetail}>Get User Detail</button>
        </div>
    )
}