"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export  default function Verifyemail() {
    const [token, settoken] = useState("");
    const [verifyed, setverifyed] = useState(false);
    const [error, sererror] = useState(false)

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verifymail', { token })
            setverifyed(true)
        } catch (error: any) {
            sererror(true)
            console.log(error.message);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        settoken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            {verifyed && <div className="">
                <h2 className="text-2xl">Emails Verifyed</h2>
                <Link href={'/login'}>login</Link>
            </div>}
            {error && <div className="">
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                <Link href={'/login'}>login</Link>
            </div>}
        </div>
    )

}
