"use client"

import React, { useState, useMemo } from "react";

export default function TemplatesPage() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const templates = useMemo(() => [
        {
            id: "t1",
            title: "Business Card",
            desc: "Information-based, for displaying business identity.",
            thumb: "/t1-template.jpeg",
            tags: ["business", "info"]
        },
        {
            id: "t2",
            title: "Showcase",
            desc: "Perfect for highlighting work and portfolios.",
            thumb: "/t2-template.png",
            tags: ["portfolio", "creative"]
        },
        {
            id: "t3",
            title: "Minimal Clean",
            desc: "Very simple, fast loading — great for personal link pages.",
            thumb: "/t3-template.png",
            tags: ["minimal", "personal"]
        },
        {
            id: "t4",
            title: "Streamer",
            desc: "To show links and social feeds together.",
            thumb: "/t4-template.jpeg",
            tags: ["stream", "social"]
        },
        {
            id: "t5",
            title: "Music Artist",
            desc: "To display the music player and release link.",
            thumb: "/t5-template.jpg",
            tags: ["music", "artist"]
        },
        {
            id: "t6",
            title: "Events",
            desc: "For event listings, RSVP buttons, ticket links.",
            thumb: "/t6-template.jpeg",
            tags: ["events", "tickets"]
        },
        {
            id: "t7",
            title: "Singers",
            desc: "To display your vibes as a musical persons.",
            thumb: "/t7-template.jpg",
            tags: ["songs", "tones"]
        },
        {
            id: "t8",
            title: "Balcombe",
            desc: "For those who loves the beautiful sky.",
            thumb: "/t8-template.png",
            tags: ["sky", "naturals"]
        },
        {
            id: "t9",
            title: "Constance",
            desc: "Specially for working professionals to listing their skills.",
            thumb: "/t9-template.jpg",
            tags: ["portfolio", "showcase"]
        },
        {
            id: "t10",
            title: "Artimis",
            desc: "For listings all of your personal social links together.",
            thumb: "/t10-template.jpeg",
            tags: ["social", "personal"]
        },
        {
            id: "t11",
            title: "Rainbow",
            desc: "For highlighting unique and attractive profile for sharing.",
            thumb: "/t11-template.jpeg",
            tags: ["rainbow", "sky"]
        },
        {
            id: "t12",
            title: "Roses",
            desc: "For those who loves to presenting their profile beautifully.",
            thumb: "/t12-template.jpg",
            tags: ["flowers", "natures"]
        },
    ], []);

    const filtered = templates.filter(t => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
            t.title.toLowerCase().includes(q) ||
            t.desc.toLowerCase().includes(q) ||
            t.tags.join(" ").toLowerCase().includes(q)
        );
    });

    function openPreview(t) {
        setSelected(t);
        setShowModal(true);
    }

    function closePreview() {
        setShowModal(false);
        setSelected(null);
    }

    const handleUseTemplate = async (t) => {
        try {
            const res = await fetch("/api/template", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    template: t.thumb,   // Card image URL sent.
                }),
            });
            if (res.ok) {
                alert("Template applied successfully!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleResetTemplate = async () => {
        try {
            const res = await fetch("/api/template", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ template: "" }),  // reset default
            });
            if (res.ok) {
                alert("Template reset to default!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function handleDownload(t) {
        try {
            // Creating a blob by fetching an image
            const res = await fetch(t.thumb);
            const blob = await res.blob();

            // Download link created
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            // filename auto will be template id + extension
            const ext = blob.type.split("/")[1] || "png";
            a.download = `${t.id}-template.${ext}`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-cyan-100 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 pt-[40vw] sm:pt-[16vw] pb-16 sm:pb-20 px-6 md:px-[8vw] ">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold">Templates</h1>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            A BitTree template to suit every brand and creator
                        </p>
                    </div>

                    {/* Search + Reset */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <input aria-label="search templates" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates here — example: portfolio, music" className="w-full sm:w-72 lg:w-80 py-2 pl-3 pr-10 rounded-md border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                            <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </div>
                        <button onClick={() => { setQuery(""); }} className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm">Reset Search</button>
                        <button onClick={handleResetTemplate} className="px-3 py-2 bg-red-500 text-white rounded-md shadow-sm text-sm">Reset Default Template</button>
                    </div>
                </header>

                {/* Templates Grid */}
                <section aria-label="templates grid">
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-500 py-16 sm:py-20 px-4">
                            No templates were found. Try using a different keyword.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((t) => (
                                <article key={t.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                                    <div className="relative">
                                        <img src={t.thumb} alt={`${t.title} thumbnail`} className="w-full h-40 sm:h-44 object-cover" />
                                        <div className="absolute right-3 top-3 flex gap-2">
                                            <button onClick={() => openPreview(t)} title="Preview" className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs sm:text-sm shadow">Preview</button>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-base sm:text-lg font-semibold">
                                            {t.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1 flex-1">
                                            {t.desc}
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex gap-2 flex-wrap">
                                                {t.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="text-[10px] sm:text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => handleUseTemplate(t)} className="px-2 sm:px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs sm:text-sm">Use</button>
                                                <button onClick={() => handleDownload(t)} className="px-2 sm:px-3 py-1.5 border border-gray-200 rounded-md text-xs sm:text-sm">Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Modal */}
                {showModal && selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40" onClick={closePreview} aria-hidden="true"></div>

                        <div role="dialog" aria-modal="true" className="relative bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border-b">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img src={selected.thumb} alt="preview" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold">{selected.title}</h2>
                                    <p className="text-sm text-gray-600 mt-1">{selected.desc}</p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <button onClick={closePreview} className="px-3 py-1 bg-gray-100 rounded-md text-sm">Close</button>
                                </div>
                            </div>

                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-lg overflow-hidden border">
                                    <img src={selected.thumb} alt="large preview" className="w-full h-64 sm:h-80 object-cover" />
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Features</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Responsive design</li>
                                        <li>Social links support</li>
                                        <li>Custom colours and fonts</li>
                                        <li>Easy export to JSON / starter files</li>
                                    </ul>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <button onClick={() => handleUseTemplate(selected)} className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">Use this template</button>
                                        <button onClick={() => handleDownload(selected)} className="px-3 sm:px-4 py-2 border rounded-md text-sm">Download this template</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
