"use client";
import React from "react";
import Link from "next/link";

const PricingPage = () => {
    const PlanCard = ({ name, price, bullets, primary }) => {
        return (
            <div className={`rounded-2xl p-8 flex flex-col justify-between text-center shadow-lg transition transform hover:scale-105 duration-300 ${primary ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}>
                <div>
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="mt-2 text-3xl font-extrabold">{price}</p>

                    <ul className={`mt-6 space-y-3 ${primary ? "text-white/90" : "text-gray-600"}`}>
                        {bullets.map((b, i) => (
                            <li key={i} className="flex items-center justify-center gap-2">
                                <svg
                                    className={`w-5 h-5 ${primary ? "text-white" : "text-indigo-600"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <Link href="/" className={`px-6 py-3 rounded-xl font-semibold shadow-md inline-block transition ${primary ? "bg-white text-indigo-600 hover:bg-gray-100" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
                        Choose
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c0dee9] to-[#e9f2f6]">
            {/* Header Section */}
            <section className="max-w-6xl mx-auto px-6 py-24 pt-40 sm:pt-48 text-center">
                <h1 className="font-extrabold text-4xl sm:text-5xl text-gray-900">
                    Pick your plan. <span className="text-indigo-600">Make it yours.</span>
                </h1>
                <h3 className="text-xl font-semibold mt-4 text-gray-700">
                    Choose the perfect plan for your growth
                </h3>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Whether you're just starting or scaling up, BitTree has a plan that fits your needs.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <PlanCard
                    name="Free"
                    price="₹0"
                    bullets={["Basic Link", "Custom URL", "50 Clicks / Month"]}
                    primary={false}
                />
                <PlanCard
                    name="Pro"
                    price="₹199 / month"
                    bullets={["Custom Theme", "Unlimited Links", "Analytics"]}
                    primary={true}
                />
                <PlanCard
                    name="Business"
                    price="₹499 / month"
                    bullets={[
                        "Team Management",
                        "Branding & Custom Domain",
                        "Priority Support",
                    ]}
                    primary={false}
                />
            </section>

            {/* Footer */}
            {/* <footer className="bg-[#323a4f] text-white py-10 mt-10"></footer> */}
            <footer className="bg-[#1e2330] text-white py-10 mt-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-lg font-semibold">
                        Start building your digital identity with{" "}
                        <span className="text-indigo-400">BitTree</span> today.
                    </p>
                    <Link href="/generate" className="inline-block mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md">
                        Join for Free
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default PricingPage;
