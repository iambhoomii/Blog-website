import { Clock, Bookmark, Heart } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  likes: number;
  tags?: string[];
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* Image */}
      <Link
        to={`/article/${post.id}`}
        className={`overflow-hidden relative block flex-shrink-0 ${
          featured ? "lg:w-2/5 h-52 lg:h-auto" : "h-48"
        }`}
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <span
          className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full ${post.categoryColor}`}
          style={{ fontWeight: 600 }}
        >
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 ${featured ? "lg:p-7" : ""}`}>
        {/* Author */}
        <div className="flex items-center gap-2.5 mb-3">
          <Link to="/profile">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full bg-gray-100 object-cover"
            />
          </Link>
          <Link to="/profile" className="text-xs text-gray-600 hover:text-black transition-colors duration-200" style={{ fontWeight: 500 }}>
            {post.author.name}
          </Link>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>

        {/* Title */}
        <Link to={`/article/${post.id}`}>
          <h3
            className={`text-gray-900 leading-snug mb-2 group-hover:text-gray-600 transition-colors duration-200 ${
              featured ? "text-xl" : "text-base"
            }`}
            style={{ fontWeight: 700 }}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={12} />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors duration-200">
              <Heart size={13} />
              <span>{post.likes}</span>
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors duration-200">
              <Bookmark size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}