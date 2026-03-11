import { TrendingUp } from "lucide-react";

const topics = [
  { label: "Technology", count: "2.4k articles", color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" },
  { label: "Programming", count: "1.8k articles", color: "bg-violet-50 text-violet-700 border-violet-100 hover:bg-violet-100" },
  { label: "Artificial Intelligence", count: "3.1k articles", color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" },
  { label: "Lifestyle", count: "980 articles", color: "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100" },
  { label: "Design", count: "1.2k articles", color: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100" },
  { label: "Startup", count: "760 articles", color: "bg-cyan-50 text-cyan-700 border-cyan-100 hover:bg-cyan-100" },
  { label: "Travel", count: "540 articles", color: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100" },
  { label: "Science", count: "890 articles", color: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100" },
  { label: "Health", count: "1.1k articles", color: "bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100" },
  { label: "Finance", count: "670 articles", color: "bg-lime-50 text-lime-700 border-lime-100 hover:bg-lime-100" },
];

export function TrendingTopics() {
  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={16} className="text-gray-500" />
          <h2 className="text-sm uppercase tracking-widest text-gray-500">Trending Topics</h2>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {topics.map((topic) => (
            <button
              key={topic.label}
              className={`flex items-center gap-2 border text-sm px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${topic.color}`}
            >
              <span style={{ fontWeight: 500 }}>{topic.label}</span>
              <span className="text-xs opacity-60">{topic.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
