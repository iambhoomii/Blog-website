import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BlogCard } from "./BlogCard";
import { allPosts } from "../data/mockPosts";

const FILTER_TABS = ["All", "AI", "Programming", "Design", "Lifestyle", "Startup", "Travel"];

export function BlogGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts =
    activeFilter === "All"
      ? allPosts
      : allPosts.filter(p => p.category === activeFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-black"></span>
          <h2 className="text-sm uppercase tracking-widest text-gray-500">Latest Articles</h2>
        </div>
        <Link
          to="/explore"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors duration-200 group"
        >
          View all
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap ${
              activeFilter === tab
                ? "bg-black text-white border-black"
                : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800 bg-white"
            }`}
            style={{ fontWeight: activeFilter === tab ? 600 : 400 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">No articles in <strong>{activeFilter}</strong> yet.</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="text-xs px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
            style={{ fontWeight: 600 }}
          >
            View all articles
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="flex justify-center mt-12">
          <Link
            to={activeFilter === "All" ? "/explore" : `/explore?category=${activeFilter}`}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-8 py-3 rounded-full hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            Load More Articles
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
