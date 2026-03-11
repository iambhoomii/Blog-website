import { useState } from "react";
import { Link } from "react-router";
import {
  Twitter, Linkedin, Globe, MapPin, Calendar, BookOpen,
  Heart, Users, Edit3, Grid3x3, List, ExternalLink, PenSquare
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BlogCard } from "../components/BlogCard";
import { allPosts } from "../data/mockPosts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1708295924503-152006f45145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdyaXRlciUyMGJsb2dnZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI3ODQwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080";

const SOCIAL = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Website" },
];

const STATS = [
  { label: "Articles", value: "34", icon: BookOpen },
  { label: "Followers", value: "4.8k", icon: Users },
  { label: "Total Likes", value: "8.6k", icon: Heart },
];

const TABS = ["All Posts", "AI & Tech", "Featured", "Saved"];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [following, setFollowing] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const displayedPosts = allPosts;

  // If logged in, show user's data; otherwise show mock profile
  const isOwnProfile = isAuthenticated;
  const profileName = isOwnProfile ? user?.name : "Sarah Mitchell";
  const profileHandle = isOwnProfile
    ? "@" + (user?.name ?? "user").toLowerCase().replace(/\s+/g, "")
    : "@sarahmitchell";
  const profileBio = isOwnProfile
    ? (user?.bio ?? "Blogify member. Reading and writing stories that matter.")
    : "AI researcher & technical writer. I simplify complex technology for curious minds. Contributing to the open-source AI community and writing about the future of machine intelligence.";

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      {/* Profile Hero */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start gap-7">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg shadow-gray-200 bg-gray-100">
                {isOwnProfile && user?.avatar ? (
                  <img src={user.avatar} alt={profileName ?? ""} className="w-full h-full object-cover" />
                ) : (
                  <ImageWithFallback
                    src={PROFILE_IMAGE}
                    alt={profileName ?? ""}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-gray-900 mb-0.5" style={{ fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.02em" }}>
                    {profileName}
                  </h1>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontWeight: 500 }}>
                    {profileHandle}
                  </p>
                  <p className="text-gray-600 text-sm max-w-lg mb-4" style={{ lineHeight: 1.65 }}>
                    {profileBio}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {isOwnProfile ? "Somewhere on Earth" : "San Francisco, CA"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      Joined {isOwnProfile ? "March 2026" : "January 2024"}
                    </span>
                    {!isOwnProfile && (
                      <a href="#" className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                        <Globe size={12} />
                        sarahmitchell.com
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {isOwnProfile && user?.email && (
                      <span className="flex items-center gap-1.5">
                        <Globe size={12} />
                        {user.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {SOCIAL.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-400 transition-all duration-200"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                  {isOwnProfile ? (
                    <Link
                      to="/create"
                      className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-sm shadow-black/20"
                      style={{ fontWeight: 600 }}
                    >
                      <PenSquare size={13} />
                      Write
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setFollowing(!following)}
                        className={`flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-full transition-all duration-200 ${
                          following
                            ? "border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 bg-white"
                            : "bg-black text-white hover:bg-gray-800 shadow-sm shadow-black/20"
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {following ? "Following" : "Follow"}
                      </button>
                      <Link
                        to="/create"
                        className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
                        style={{ fontWeight: 500 }}
                      >
                        <Edit3 size={13} />
                        Write
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-6 pt-5 border-t border-gray-200">
                {STATS.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                      <Icon size={13} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm leading-none" style={{ fontWeight: 700 }}>{value}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tabs + View Toggle */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
                style={{ fontWeight: activeTab === tab ? 600 : 400 }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border border-gray-200 rounded-full p-1 bg-gray-50">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all duration-200 ${viewMode === "grid" ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Grid3x3 size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all duration-200 ${viewMode === "list" ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Posts Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayedPosts.map(post => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-8 py-3 rounded-full hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
            Load More Articles
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}