"use client"

import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FooterSection() {
    const [text, setText] = useState("")
    const router = useRouter()
    const createTree = () => {
        router.push(`/generate?handle=${text}`)
    }
    const year = new Date().getFullYear();

    return (
        <div className="relative bg-[#502274] overflow-hidden">
            {/* Top Shape Image */}
            <Image src="/home-9.svg" alt="Top Shape" width={402} height={400} priority className="absolute py-8 left-9 top-0 z-0 select-none rotate-12" />
            {/* Right Shape */}
            <Image src="/home-10.png" alt="Decoration" width={502} height={500} priority className="absolute -right-28 top-[28%] z-0 pointer-events-none select-none" />

            {/* Heading + Input + Button */}
            <div className="relative z-10 text-center pt-16 pb-44">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#e9c0e9] leading-tight">
                    Jumpstart your corner of the <br /> internet today
                </h1>

                <div className="mt-6 flex justify-center">
                    <div className="mt-10 flex items-center justify-center gap-4 relative z-10">
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Enter your Handle" className="px-6 py-4 w-[150px] md:w-[260px] rounded-lg bg-white text-lg font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-[#c09fcf] transition-all duration-300" />
                        <button onClick={() => { createTree() }} className="px-6 py-4 rounded-full bg-[#d2e823] hover:bg-[#c2d721] text-[#1e2330] font-bold text-lg shadow-md transition-all duration-300 cursor-pointer">Claim your BitTree</button>
                    </div>
                </div>
            </div>

            {/* Footer Card */}
            <div className="relative z-20 mx-auto max-w-6xl bg-white rounded-2xl shadow-lg px-8 pt-36 pb-6">
                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-2xl mb-3">Company</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <Link href={"/"}><li className="py-2">The Linktree Blog</li></Link>
                            <Link href={"/"}><li className="py-2">Engineering Blog</li></Link>
                            <Link href={"/"}><li className="py-2">Marketplace</li></Link>
                            <Link href={"/"}><li className="py-2">What's New</li></Link>
                            <Link href={"/"}><li className="py-2">About</li></Link>
                            <Link href={"/"}><li className="py-2">Press</li></Link>
                            <Link href={"/"}><li className="py-2">Careers</li></Link>
                            <Link href={"/"}><li className="py-2">Link in Bio</li></Link>
                            <Link href={"/"}><li className="py-2">Social Good</li></Link>
                            <Link href={"/"}><li className="py-2">Contact</li></Link>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-2xl mb-3">Community</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <Link href={"/"}><li className="py-2">Linktree for Enterprise</li></Link>
                            <Link href={"/"}><li className="py-2">2023 Creator Report</li></Link>
                            <Link href={"/"}><li className="py-2">2022 Creator Report</li></Link>
                            <Link href={"/"}><li className="py-2">Charttiles</li></Link>
                            <Link href={"/"}><li className="py-2">What's Trending</li></Link>
                            <Link href={"/"}><li className="py-2">Creator Profile Directory</li></Link>
                            <Link href={"/"}><li className="py-2">Explore Templates</li></Link>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-2xl mb-3">Support</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <Link href={"/"}><li className="py-2">Help Topics</li></Link>
                            <Link href={"/"}><li className="py-2">Getting Started</li></Link>
                            <Link href={"/"}><li className="py-2">Linktree Pro</li></Link>
                            <Link href={"/"}><li className="py-2">Features & How-Tos</li></Link>
                            <Link href={"/"}><li className="py-2">FAQs</li></Link>
                            <Link href={"/"}><li className="py-2">Report a Violation</li></Link>
                        </ul>
                    </div>

                    {/* Trust & Legal */}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-2xl mb-3">Trust & Legal</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <Link href={"/"}><li className="py-2">Terms & Conditions</li></Link>
                            <Link href={"/"}><li className="py-2">Privacy Notice</li></Link>
                            <Link href={"/"}><li className="py-2">Cookie Notice</li></Link>
                            <Link href={"/"}><li className="py-2">Trust Center</li></Link>
                            <Link href={"/"}><li className="py-2">Cookie Preferences</li></Link>
                            <Link href={"/"}><li className="py-2">Transparency Report</li></Link>
                            <Link href={"/"}><li className="py-2">Law Enforcement Access Policy</li></Link>
                        </ul>
                    </div>
                </div>

                {/* Buttons + Icons */}
                <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
                    {/* Left Buttons */}
                    <div className="flex gap-3">
                        <button className="px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm">
                            Log in
                        </button>
                        <button className="px-5 py-2 rounded-md bg-[#d2e823] hover:bg-[#c2d721] text-sm font-medium text-[#1e2330]">
                            Get started for free
                        </button>
                    </div>

                    {/* App Store Buttons */}
                    <div className="flex gap-3">
                        <Link href={"/"}><Image src="/app-store-copy.png" alt="App Store" width={140} height={40} className="cursor-pointer" /></Link>
                        <Link href={"/"}><Image src="/google-play-copy.png" alt="Google Play" width={155} height={40} className="cursor-pointer" /></Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 text-white">
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaInstagram size={30} /></div></Link>
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaTiktok size={30} /></div></Link>
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaYoutube size={30} /></div></Link>
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaThreads size={30} /></div></Link>
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaTwitter size={30} /></div></Link>
                        <Link href={"/"}><div className="bg-[#1e2330] rounded-full p-3"><FaFacebook size={30} /></div></Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 mt-8 pb-8 text-center text-[#e9c0e9] font-semibold text-base px-4">
                <p>We acknowledge the Traditional Custodians of the land on which our offices stand.</p>
                <p>Copyright &copy; {year} <span className="font-bold">BitTree</span>. All rights reserved.</p>
                <p>Created with ❤️ by Deba</p>
            </div>
        </div>
    );
}
