import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketplaceCard({ app }) {
    const [text, setText] = useState("");
    const router = useRouter();
    const createTree = () => {
        router.push(`/generate?handle=${text}`)
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition p-6 flex flex-col items-center text-center">
            <img src={app.image} alt={app.name} className="w-16 h-16 mb-4 rounded-lg object-contain" />
            <h4 className="text-lg font-semibold mb-2">{app.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{app.description}</p>
            <button onClick={() => createTree()} className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full transition">
                Add to BitTree
            </button>
        </div>
    );
}
