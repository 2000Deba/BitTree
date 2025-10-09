"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LearnPage() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setArticles([
            {
                id: 1,
                title: "How to build your first BitTree page",
                desc: "Step-by-step guide to creating and customizing your own BitTree profile.",
                img: "/learn1.png",
                category: "Guides",
            },
            {
                id: 2,
                title: "Top 5 ways to grow your audience with BitTree",
                desc: "Boost your reach with smart link strategies and optimized sharing.",
                img: "/learn2.png",
                category: "Tips",
            },
            {
                id: 3,
                title: "Using Canva with BitTree",
                desc: "Design amazing headers in Canva and connect them seamlessly to BitTree.",
                img: "/learn3.png",
                category: "Integrations",
            },
            {
                id: 4,
                title: "BitTree Pro vs Free — Which is right for you?",
                desc: "Compare plans and choose the best one for your needs.",
                img: "/learn4.png",
                category: "Pricing",
            },
            {
                id: 5,
                title: "Building your brand identity on BitTree",
                desc: "Make your BitTree page reflect your true brand personality.",
                img: "/learn5.png",
                category: "Branding",
            },
            {
                id: 6,
                title: "Analytics made easy — Track your success",
                desc: "Learn how to analyze clicks and traffic from your BitTree dashboard.",
                img: "/learn6.png",
                category: "Analytics",
            },
        ])
    }, [])

    return (
        <div className="min-h-screen bg-[#c0dee9] text-gray-900">
            {/* Hero Section */}
            <section className="text-center sm:py-[16vw] pt-[45vw] pb-[16vw] px-6 md:px-[8vw] gap-10 bg-gradient-to-r from-[#6fc2ca] via-[#4f33f8] to-[#6c2ce2] text-white">
                <h1 className="text-4xl sm:text-5xl font-extrabold">Learn with BitTree</h1>
                <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                    Tutorials, tips, and insights to help you grow and design the perfect BitTree page.
                </p>
            </section>

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative w-full h-52">
                                <Image src={item.img} alt={item.title} fill className="object-contain" />
                            </div>

                            <div className="p-5 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs uppercase text-indigo-600 font-semibold">{item.category}</span>
                                    <h2 className="mt-2 font-bold text-lg leading-tight">{item.title}</h2>
                                    <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
                                </div>

                                <div className="mt-4">
                                    <Link href="#" className="text-indigo-600 font-semibold text-sm hover:underline">Read more →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#1e2330] text-white py-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold">Start creating your BitTree today</h2>
                <p className="mt-3 text-white/80 text-lg">
                    Join thousands of creators already using BitTree to share smarter.
                </p>
                <Link href="/generate" className="inline-block mt-6 bg-gradient-to-r from-[#6fc2ca] via-[#4f33f8] to-[#6c2ce2] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Join for Free</Link>
            </section>

            {/* Footer */}
            <footer className="border-t bg-gradient-to-r from-[#6fc2ca] via-[#4f33f8] to-[#6c2ce2]">
                <div className="max-w-6xl mx-auto px-6 py-8 text-white flex flex-col md:flex-row justify-center items-center text-center text-xl sm:text-2xl font-bold">
                    BitTree • Developed by Debasish Seal
                </div>
            </footer>
        </div>
    )
}
