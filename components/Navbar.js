"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();

    const pathname = usePathname()
    const showNavbar = ["/", "/generate","/login", "/register"].includes(pathname)

    return (
        <>
            {showNavbar &&
                <nav className='bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full p-5 px-7 z-50'>
                    <div className="logo flex gap-20 items-center">
                        <Link href="/" className="text-3xl font-semibold flex items-center tracking-tight select-none">
                            <span className="ml-2">BitTree</span>
                            <img className="w-12 h-12" src="/bittree.png" alt="" />
                        </Link>

                        <ul className='flex gap-10'>
                            <Link href={"/"}><li>Templates </li></Link>
                            <Link href={"/"}><li>Marketplace</li></Link>
                            <Link href={"/"}><li>Discover</li></Link>
                            <Link href={"/"}><li>Pricing</li></Link>
                            <Link href={"/"}><li>Learn</li></Link>
                        </ul>
                    </div>
                    <div className='flex gap-2'>
                        <ul className='flex items-center gap-4'>
                            {status === "loading" ? null : !session ? (
                                <li>
                                    <button onClick={() => signIn()} className="login bg-gray-400 p-4 rounded-lg font-bold cursor-pointer">Log in</button>
                                </li>
                            ) : (
                                <>
                                    <li><Link href="/generate">Generate</Link></li>
                                    <li>
                                        <Link href={`/${session.user.handle || ""}`}>My BitTree</Link>
                                    </li>
                                    <li>
                                        <button onClick={() => signOut()} className="logout bg-gray-400 p-4 rounded-lg font-bold cursor-pointer">Logout</button>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link href="/register"><button className="signup bg-gray-900 text-white p-4 rounded-full font-bold cursor-pointer">Sign up free</button></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            }
        </>
    )
}

export default Navbar