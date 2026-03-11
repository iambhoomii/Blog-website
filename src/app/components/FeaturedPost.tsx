import { ArrowRight, Clock, Bookmark } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredPost = {
  tag: "Editor's Pick",
  title: "The Future of Technology: How AI is Reshaping the Way We Work and Live",
  description:
    "Artificial intelligence is no longer a concept of the future — it's here, transforming industries from healthcare to finance, and redefining what's possible. Explore how the world's leading companies are leveraging AI to unlock new opportunities.",
  author: {
    name: "Sarah Mitchell",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah",
    role: "Tech Editor",
  },
  date: "March 5, 2026",
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1758272422316-9d068810052d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmxvZyUyMG1vZGVybiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzI2OTE1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function FeaturedPost() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-black"></span>
        <span className="text-xs uppercase tracking-widest text-gray-500">Featured Story</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Content */}
        <div className="order-2 lg:order-1 flex flex-col gap-5">
          <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            {featuredPost.tag}
          </span>

          <Link to="/article/1">
            <h1
              className="text-3xl sm:text-4xl text-gray-900 leading-tight hover:text-gray-600 transition-colors duration-200"
              style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {featuredPost.title}
            </h1>
          </Link>

          <p className="text-gray-500 leading-relaxed text-base">
            {featuredPost.description}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-1">
            <img
              src={featuredPost.author.avatar}
              alt={featuredPost.author.name}
              className="w-10 h-10 rounded-full bg-gray-100 object-cover"
            />
            <div>
              <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>{featuredPost.author.name}</p>
              <p className="text-xs text-gray-400">{featuredPost.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-gray-400">
              <span>{featuredPost.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {featuredPost.readTime}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/article/1"
              className="flex items-center gap-2 bg-black text-white text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-200 group"
            >
              Read Article
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-3 rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-200">
              <Bookmark size={14} />
              Save
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <Link to="/article/1" className="block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl shadow-gray-200/80">
              <ImageWithFallback
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
