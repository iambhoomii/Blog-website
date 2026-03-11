import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BlogCard } from "../components/BlogCard";
import { allPosts } from "../data/mockPosts";

const CATEGORIES = [
  { label: "All", color: "bg-gray-900 text-white border-gray-900" },
  { label: "AI", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
  { label: "Programming", color: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100" },
  { label: "Design", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
  { label: "Lifestyle", color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" },
  { label: "Startup", color: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" },
  { label: "Travel", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
  { label: "Science", color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" },
  { label: "Health", color: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100" },
  { label: "Finance", color: "bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100" },
  { label: "Technology", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
];

const SORT_OPTIONS = ["Relevance", "Newest", "Most Liked", "Most Commented"];

const TRENDING_SEARCHES = [
  "Large Language Models", "React 2026", "Minimalist Design", "Startup funding",
  "Morning routine", "Remote work", "Climate tech",
];

export default function Explore() {
  const location = useLocation();

  const getParams = () => new URLSearchParams(location.search);

  const [query, setQuery] = useState(() => getParams().get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState(() => getParams().get("category") ?? "All");
  const [activeSort, setActiveSort] = useState("Relevance");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasSearched, setHasSearched] = useState(() => {
    const p = getParams();
    return !!(p.get("q") || p.get("category"));
  });
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-sync when URL changes (e.g. navigated from article tag or grid filter)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") ?? "";
    const cat = params.get("category") ?? "All";
    setQuery(q);
    setActiveCategory(cat);
    setHasSearched(!!(q || cat !== "All"));
  }, [location.search]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) setHasSearched(true);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setHasSearched(true);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery("");
    setHasSearched(false);
    setActiveCategory("All");
    inputRef.current?.focus();
  };

  const filteredPosts = allPosts.filter(post => {
    const matchesQuery =
      !query.trim() ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      {/* Search Hero */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-2 justify-center mb-3">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-gray-500" style={{ fontWeight: 600 }}>
              Explore Blogify
            </span>
          </div>
          <h1
            className="text-center text-gray-900 mb-3"
            style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.025em" }}
          >
            Find your next great read
          </h1>
          <p className="text-center text-gray-500 text-base mb-8">
            Search across thousands of articles on technology, design, lifestyle, and more.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div
              className={`flex items-center gap-3 bg-white border-2 rounded-2xl px-5 py-4 transition-all duration-200 ${
                searchFocused
                  ? "border-gray-900 shadow-lg shadow-gray-200/60"
                  : "border-gray-200 shadow-md shadow-gray-200/40 hover:border-gray-300"
              }`}
            >
              <Search size={20} className={searchFocused ? "text-gray-700" : "text-gray-400"} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search articles, authors, or topics..."
                className="flex-1 text-gray-900 text-base placeholder-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all duration-200 flex-shrink-0 shadow-sm"
                style={{ fontWeight: 600 }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Trending searches */}
          {!hasSearched && (
            <div className="flex items-center gap-2 flex-wrap mt-4 justify-center">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <TrendingUp size={12} />
                <span>Trending:</span>
              </div>
              {TRENDING_SEARCHES.map(term => (
                <button
                  key={term}
                  onClick={() => handleTrendingClick(term)}
                  className="text-xs text-gray-500 hover:text-black bg-white border border-gray-200 hover:border-gray-400 px-3 py-1 rounded-full transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(cat.label); if (cat.label !== "All") setHasSearched(true); else if (!query) setHasSearched(false); }}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCategory === cat.label
                    ? cat.label === "All"
                      ? "bg-gray-900 text-white border-gray-900"
                      : cat.color.replace("hover:", "")
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
                }`}
                style={{ fontWeight: activeCategory === cat.label ? 600 : 400 }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-full border transition-all duration-200 ${
                showFilters ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
              }`}
              style={{ fontWeight: 500 }}
            >
              <SlidersHorizontal size={13} />
              Filters
            </button>
            <select
              value={activeSort}
              onChange={e => setActiveSort(e.target.value)}
              className="text-sm px-3.5 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 transition-all duration-200 outline-none bg-white appearance-none pr-8 cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Read Time</label>
                <div className="flex flex-col gap-1.5">
                  {["Under 3 min", "3–7 min", "7+ min"].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="readtime" className="accent-black" />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Date Published</label>
                <div className="flex flex-col gap-1.5">
                  {["Last 24 hours", "Last 7 days", "Last 30 days", "All time"].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="date" className="accent-black" />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Minimum Likes</label>
                <div className="flex flex-col gap-1.5">
                  {["Any", "50+ likes", "200+ likes", "500+ likes"].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="likes" className="accent-black" />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button className="text-xs px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200" style={{ fontWeight: 600 }}>
                Apply Filters
              </button>
              <button onClick={clearSearch} className="text-xs px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 transition-all duration-200">
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {hasSearched || query ? (
              <p className="text-sm text-gray-500">
                Showing <span className="text-gray-900" style={{ fontWeight: 600 }}>{filteredPosts.length}</span> results
                {query && <> for <span className="text-gray-900" style={{ fontWeight: 600 }}>"{query}"</span></>}
                {activeCategory !== "All" && (
                  <> in <span className="text-gray-900" style={{ fontWeight: 600 }}>{activeCategory}</span></>
                )}
              </p>
            ) : (
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-black"></span>
                <p className="text-sm uppercase tracking-widest text-gray-500">All Articles</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-8 py-3 rounded-full hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
                Load More
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>No results found</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              We couldn't find any articles matching "{query || activeCategory}". Try a different keyword or browse by category.
            </p>
            <button
              onClick={clearSearch}
              className="text-sm px-6 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
              style={{ fontWeight: 600 }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Suggested Topics */}
      {!hasSearched && !query && (
        <section className="bg-gray-50 border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-7">
              <TrendingUp size={15} className="text-gray-500" />
              <h2 className="text-sm uppercase tracking-widest text-gray-500">Trending Topics</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Artificial Intelligence", count: "3.1k", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
                { label: "JavaScript", count: "2.2k", color: "bg-violet-50 border-violet-100 text-violet-700" },
                { label: "UX Design", count: "1.8k", color: "bg-amber-50 border-amber-100 text-amber-700" },
                { label: "Productivity", count: "1.5k", color: "bg-rose-50 border-rose-100 text-rose-700" },
                { label: "Startup", count: "960", color: "bg-cyan-50 border-cyan-100 text-cyan-700" },
                { label: "Python", count: "1.3k", color: "bg-blue-50 border-blue-100 text-blue-700" },
                { label: "Remote Work", count: "720", color: "bg-orange-50 border-orange-100 text-orange-700" },
                { label: "Web3", count: "840", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
                { label: "Mental Health", count: "640", color: "bg-teal-50 border-teal-100 text-teal-700" },
                { label: "Climate Tech", count: "510", color: "bg-lime-50 border-lime-100 text-lime-700" },
              ].map(topic => (
                <button
                  key={topic.label}
                  onClick={() => handleTrendingClick(topic.label)}
                  className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 ${topic.color}`}
                >
                  <span className="text-sm mb-1" style={{ fontWeight: 600 }}>{topic.label}</span>
                  <span className="text-xs opacity-60">{topic.count} articles</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
