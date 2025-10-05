export default function CategoryTabs({ categories, activeCategory, setActiveCategory }) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>{cat}</button>
            ))}
        </div>
    );
}
