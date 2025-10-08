"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DiscoverPage() {

    function FeatureCard({ title, desc }) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="font-semibold">{title}</div>
                <p className="mt-2 text-gray-600 text-sm">{desc}</p>
            </div>
        )
    }

    function Accordion({ title, children }) {
        return (
            <details className="mt-4 bg-white p-4 rounded-lg shadow-sm" open>
                <summary className="cursor-pointer font-medium">{title}</summary>
                <div className="mt-2 text-gray-600 text-sm">{children}</div>
            </details>
        )
    }

    const router = useRouter();
    const createTree = () => {
        router.push("/generate")
    }


    return (
        <div className="min-h-screen bg-[#c0dee9] text-gray-900">
            {/* Top Section */}
            <section className="bg-[#1e2330] flex flex-col md:flex-row items-center justify-between sm:py-[16vw] pt-[45vw] pb-[16vw] px-6 md:px-[8vw] gap-10">
                {/* Left side */}
                <div className="flex flex-col gap-4 text-center md:text-left order-2 md:order-1 max-w-xl">
                    <p className="text-white text-base sm:text-lg lg:text-xl">Seamless Integrations</p>

                    <div className="flex flex-col md:flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <p className="text-white font-extrabold text-4xl sm:text-5xl lg:text-5xl">
                                Design in
                            </p>
                            <Image width={140} height={140} src="/canva.png" alt="Canva" className="w-16 sm:w-24 md:w-32 h-auto" />
                        </div>
                        <p className="text-white font-extrabold text-4xl sm:text-5xl lg:text-5xl mt-3 md:mt-2">
                            Use in BitTree.
                        </p>
                    </div>

                    <p className="text-white text-base sm:text-lg lg:text-xl mt-4">
                        Seamlessly import your custom designs from Canva to refresh your
                        Linktree header image and wallpaper.
                    </p>

                    <div className="flex justify-center md:justify-start mt-6">
                        <button onClick={() => createTree()} className="bg-gradient-to-r from-[#6fc2ca] via-[#4f33f8] to-[#6c2ce2] text-white rounded-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold shadow-md hover:opacity-90 transition w-full sm:w-auto">
                            Join BitTree for free
                        </button>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex justify-center items-center order-1 md:order-2 w-full md:w-1/2">
                    <img src="/discover.png" alt="Discover Section" className="max-w-full h-auto rounded-xl" />
                </div>
            </section>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center md:text-left">
                        Organize links-in-bio — all your links in one place
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 text-center md:text-left">
                        Easily display profile links, social, shop, and campaign links with
                        BitTree&apos;s Link-in-Bio tool — code-free, fast, and mobile-friendly.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                        <Link href="/generate" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:bg-indigo-500">
                            Create now
                        </Link>
                        <Link href="/templates" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-5 py-3 rounded-lg">
                            View template
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex gap-3 items-center">
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2L12 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 8L12 14L18 8"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>Fast loading — optimized for mobile also</div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M8 12l2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>Extensible — Custom themes and branding</div>
                        </div>
                    </div>
                </div>

                {/* Right card */}
                <div className="flex-1 w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                                <img className="rounded-lg object-cover w-full h-full" src="/debasish-seal.jpg" alt="Profile" />
                            </div>
                            <div>
                                <div className="font-semibold">Debasish Seal</div>
                                <div className="text-sm text-gray-500 break-all">
                                    Debasish-Seal · bittree-deba.vercel.app/Debasish-Seal
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Link href="https://bittree-deba.vercel.app/Debasish-Seal" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                my site
                            </Link>
                            <Link href="https://github.com/2000Deba/BitTree" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                Project Summary
                            </Link>
                            <Link href="https://github.com/2000Deba" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                GitHub
                            </Link>
                        </div>

                        <div className="mt-5 flex justify-between text-sm text-gray-500">
                            <div>1.27k views</div>
                            <div>editing</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-semibold text-center md:text-left">
                    Why BitTree Link-in-Bio?
                </h2>
                <p className="mt-2 text-gray-600 text-center md:text-left">
                    Some reasons why users like it:
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Custom theme"
                        desc="Add your brand colors and images."
                    />
                    <FeatureCard
                        title="Universal Sharing"
                        desc="WhatsApp, Instagram, Twitter — looks great everywhere."
                    />
                    <FeatureCard
                        title="Analytics"
                        desc="See how many times a link has been clicked."
                    />
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                <h3 className="text-xl font-semibold text-center md:text-left">
                    Frequently Asked Questions
                </h3>
                <Accordion title="How fast does the site load?">
                    BitTree&apos;s Link-in-Bio page is designed mobile-first—with recent
                    optimizations—and loads quickly.
                </Accordion>
                <Accordion title="Can I use my own domain?">
                    Yes — you can add your own custom domain to the Pro plan.
                </Accordion>
            </section>

            {/* Footer */}
            <footer className="border-t mt-8 bg-gradient-to-r from-[#6fc2ca] via-[#4f33f8] to-[#6c2ce2]">
                <div className="max-w-6xl mx-auto px-6 py-8 text-white flex flex-col md:flex-row justify-center items-center text-center text-2xl sm:text-3xl font-bold">
                    <div>BitTree • Developed by Debasish Seal</div>
                </div>
            </footer>
        </div>
    )
}