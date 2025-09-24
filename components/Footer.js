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
            <Image src="/home-9.svg" alt="Top Shape" width={402} height={400} priority className="absolute py-8 left-4 sm:left-9 top-0 z-0 select-none rotate-12" />
            {/* Right Shape */}
            <Image src="/home-10.png" alt="Decoration" width={502} height={500} priority className="absolute -right-20 sm:-right-28 top-[20%] sm:top-[28%] z-0 pointer-events-none select-none" />

            {/* Heading + Input + Button */}
            <div className="relative z-10 text-center pt-16 pb-36 sm:pb-44 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e9c0e9] leading-snug sm:leading-tight md:leading-tight">
                    Jumpstart your corner of the <br /> internet today
                </h1>

                <div className="mt-6 flex justify-center">
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Enter your Handle" className="w-full sm:w-[260px] px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white text-base sm:text-lg font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-[#c09fcf] transition-all duration-300" />
                        <button onClick={() => createTree()} className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-lg bg-[#d2e823] hover:bg-[#c2d721] text-[#1e2330] font-bold text-base sm:text-lg shadow-md transition-all duration-300">Claim your BitTree</button>
                    </div>
                </div>
            </div>

            {/* Footer Card */}
            <div className="relative z-20 mx-auto max-w-6xl bg-white rounded-2xl shadow-lg px-4 sm:px-8 pt-28 sm:pt-36 pb-6 sm:pb-8">
                {/* Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-left">
                    {/** Company **/}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-lg sm:text-2xl mb-3">Company</h3>
                        <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">The Linktree Blog</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Engineering Blog</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Marketplace</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">What&apos;s New</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">About</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Press</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Careers</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Link in Bio</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Social Good</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Contact</li></Link>
                        </ul>
                    </div>

                    {/** Community **/}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-lg sm:text-2xl mb-3">Community</h3>
                        <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Linktree for Enterprise</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">2023 Creator Report</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">2022 Creator Report</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Charttiles</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">What&apos;s Trending</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Creator Profile Directory</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Explore Templates</li></Link>
                        </ul>
                    </div>

                    {/** Support **/}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-lg sm:text-2xl mb-3">Support</h3>
                        <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Help Topics</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Getting Started</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Linktree Pro</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Features & How-Tos</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">FAQs</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Report a Violation</li></Link>
                        </ul>
                    </div>

                    {/** Trust & Legal **/}
                    <div>
                        <h3 className="font-semibold text-[#1e2330] text-lg sm:text-2xl mb-3">Trust & Legal</h3>
                        <ul className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Terms & Conditions</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Privacy Notice</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Cookie Notice</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Trust Center</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Cookie Preferences</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Transparency Report</li></Link>
                            <Link href="/"><li className="py-1 sm:py-2 cursor-pointer hover:text-[#502274] transition-colors">Law Enforcement Access Policy</li></Link>
                        </ul>
                    </div>
                </div>

                {/* Buttons + Icons */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 flex-wrap">
                    {/* Left Buttons */}
                    <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                        <Link href={"/login"}><button className="px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm">Log in</button></Link>
                        <Link href={"/register"}><button className="px-5 py-2 rounded-md bg-[#d2e823] hover:bg-[#c2d721] text-sm font-medium text-[#1e2330]">Get started for free</button></Link>
                    </div>

                    {/* App Store Buttons */}
                    <div className="flex gap-3 justify-center sm:justify-end flex-wrap">
                        <Link href="/"><Image src="/app-store-copy.png" alt="App Store" width={140} height={40} className="cursor-pointer" /></Link>
                        <Link href="/"><Image src="/google-play-copy.png" alt="Google Play" width={155} height={40} className="cursor-pointer" /></Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 justify-center sm:justify-end flex-wrap text-white">
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaInstagram size={25} /></div></Link>
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaTiktok size={25} /></div></Link>
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaYoutube size={25} /></div></Link>
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaThreads size={25} /></div></Link>
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaTwitter size={25} /></div></Link>
                        <Link href="/"><div className="bg-gray-950 hover:bg-[#1e2330] rounded-full p-3"><FaFacebook size={25} /></div></Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 mt-8 pb-8 text-center text-[#e9c0e9] font-semibold text-xs sm:text-base px-4 space-y-1">
                <p>We acknowledge the Traditional Custodians of the land on which our offices stand.</p>
                <p>Copyright &copy; {year} <span className="font-bold">BitTree</span>. All rights reserved.</p>
                <p>Created with ❤️ by Deba</p>
            </div>
        </div>

    );
}
