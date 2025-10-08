"use client";
import { useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import MarketplaceCard from "@/components/MarketplaceCard";
import Link from "next/link";

export default function MarketplacePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [menuOpen, setMenuOpen] = useState(false);

    const apps = [
        {
            id: 1,
            name: "Spotify",
            description: "Share your latest tracks and playlists with your followers.",
            category: "Social",
            image: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
        },
        {
            id: 2,
            name: "PayPal",
            description: "Collect donations and payments securely via PayPal.",
            category: "Monetization",
            image: "https://cdn-icons-png.flaticon.com/512/196/196565.png",
        },
        {
            id: 3,
            name: "Google Analytics",
            description: "Track visitor analytics and performance metrics.",
            category: "Analytics",
            image: "https://cdn-icons-png.flaticon.com/512/2965/2965358.png",
        },
        {
            id: 4,
            name: "YouTube",
            description: "Embed your latest videos and grow your channel audience.",
            category: "Social",
            image: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        },
        {
            id: 5,
            name: "Shopify",
            description: "Showcase and sell your products directly on your BitTree.",
            category: "Monetization",
            image: "https://cdn-icons-png.flaticon.com/512/5968/5968776.png",
        },
    ];

    const categories = ["All", "Social", "Monetization", "Analytics"];

    const filteredApps =
        activeCategory === "All"
            ? apps
            : apps.filter((app) => app.category === activeCategory);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 w-[85vw] absolute right-[7.5vw] py-4 px-8 shadow-md z-50 top-8 rounded-full">
                <div className="max-w-6xl mx-auto flex justify-between items-center relative py-1">
                    <div className="flex text-xl sm:text-2xl font-bold">
                        <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center select-none">
                            <span>BitTree</span>
                            <img className="w-7 h-7" src="/bittree.png" alt="logo" />
                        </Link> | <Link href={"/marketplace"}>Marketplace</Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-6 text-sm">
                        <Link href="#" className="text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500">
                            Browse
                        </Link>
                        <Link href="#" className="text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500">
                            Developers
                        </Link>
                        <Link href="#" className="text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500">
                            About
                        </Link>
                    </nav>

                    {/* Hamburger Menu Button */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none">
                        <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
                    </button>

                    {/* Mobile Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute top-14 right-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col items-start py-3 px-5 space-y-3 w-40 md:hidden">
                            <Link href="#" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 font-semibold">
                                Browse
                            </Link>
                            <Link href="#" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 font-semibold">
                                Developers
                            </Link>
                            <Link href="#" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 font-semibold">
                                About
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-[#780016] grid grid-cols-1 md:grid-cols-2 pt-[32vw] sm:pt-[14vw] pb-[6vw] px-6 md:px-[8vw] gap-8">
                {/* Left side text */}
                <div className="flex justify-center flex-col gap-4 text-center md:text-left order-2 md:order-1">
                    <div className="text-start">
                        <p className="text-[#e9c0e9] font-extrabold text-4xl sm:text-5xl lg:text-7xl">
                            Connect more of you
                        </p>
                    </div>

                    <p className="text-[#e9c0e9] text-lg sm:text-xl lg:text-2xl my-4 text-start">
                        Bring the best experiences across the internet to one place: your BitTree
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <input className="w-full sm:w-3/4 h-14 sm:h-16 px-4 py-3 rounded-lg outline-none" type="text" placeholder="🔍 Search Link Apps and integrations..." />
                    </div>
                </div>

                {/* Right side image */}
                <div className="flex justify-center items-center order-1 md:order-2">
                    <img src="/marketplace.jpg" alt="homepage image" className="max-w-full h-auto rounded-lg" />
                </div>
            </section>

            {/* Discover Section */}
            <section className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Discover powerful integrations for your BitTree
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Explore apps and tools that connect your links, boost engagement, and help you
                    grow your audience.
                </p>
            </section>

            {/* Categories */}
            <section className="max-w-6xl mx-auto px-4">
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* App Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredApps.map((app) => (
                        <MarketplaceCard key={app.id} app={app} />
                    ))}
                </div>
            </section>

            {/* Developer CTA */}
            <section className="max-w-6xl mx-auto px-4 pt-16 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-2xl shadow-sm">
                    <h3 className="text-2xl font-semibold mb-2">
                        Build your own integration
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Are you a developer? Create your own BitTree app and share it with the world.
                    </p>
                    <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">
                        Join Developer Program
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <section className="max-w-6xl mx-auto my-20 px-4 sm:px-8 lg:px-12">
                    <div className="w-full flex justify-center items-center bg-[#D6A336] dark:bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-sm">
                        <div className="flex flex-row justify-center items-center gap-4 sm:gap-8 md:gap-10 flex-wrap sm:flex-nowrap text-center">
                            <h1 className="text-gray-950 dark:text-white text-5xl sm:text-7xl md:text-9xl font-extrabold whitespace-nowrap">
                                BitTree
                            </h1>
                            <img className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" src="/bittree.png" alt="BitTree logo" />
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
}
