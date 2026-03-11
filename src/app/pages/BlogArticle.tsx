import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  Heart, MessageCircle, Bookmark, Share2, Twitter, Link2,
  Clock, ArrowLeft, MoreHorizontal, Send, ChevronDown, AlertCircle
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BlogCard } from "../components/BlogCard";
import { allPosts } from "../data/mockPosts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Article content keyed by post id
const articleContents: Record<number, Array<{ type: string; text: string }>> = {
  1: [
    { type: "paragraph", text: "Large Language Models (LLMs) have fundamentally changed the way we interact with computers. From writing emails to generating code, these models seem almost magical — but behind the curtain lies a fascinating system of mathematics, statistics, and engineering." },
    { type: "heading", text: "What is a Language Model?" },
    { type: "paragraph", text: "At its core, a language model is a system trained to predict the next word (or token) in a sequence. If you give it the phrase \"The sky is\", it should predict \"blue\" with high probability. Simple, right? But when you scale this idea up to billions of parameters and train it on the entire internet, something remarkable emerges." },
    { type: "quote", text: "\"Scale is all you need.\" — This phrase, sometimes said half-jokingly in AI circles, captures a deep truth about modern language models." },
    { type: "paragraph", text: "Modern LLMs like GPT-4, Claude, and Gemini are based on a neural network architecture called the Transformer, introduced in the landmark 2017 paper \"Attention is All You Need\" by researchers at Google. The key innovation was the attention mechanism — a way for the model to focus on different parts of the input when generating each output token." },
    { type: "heading", text: "How Training Works" },
    { type: "paragraph", text: "Training an LLM is a process of massive optimization. The model reads billions of text examples and adjusts its internal parameters (weights) to minimize the difference between its predictions and the actual next words. This happens through a technique called backpropagation with gradient descent." },
    { type: "paragraph", text: "The result is a model that has, in a sense, compressed a huge amount of human knowledge into its weights. It doesn't \"understand\" in the way humans do — but it's remarkably good at pattern-matching and generating coherent, contextually appropriate text." },
    { type: "heading", text: "Why Does Size Matter?" },
    { type: "paragraph", text: "One of the most surprising findings in AI research is that simply making models bigger leads to qualitatively new capabilities. This is called emergent behavior. At a certain scale, models that couldn't do arithmetic suddenly can. Models that couldn't reason step-by-step suddenly do chain-of-thought reasoning." },
  ],
  2: [
    { type: "paragraph", text: "JavaScript has evolved dramatically over the past decade. With each new specification, developers gain powerful new tools to write cleaner, faster, and more expressive code. In 2026, here are the tips every serious developer should know." },
    { type: "heading", text: "Optional Chaining and Nullish Coalescing" },
    { type: "paragraph", text: "These two features, though not brand new, remain underused. Optional chaining (?.) lets you safely access deeply nested properties without throwing errors. Nullish coalescing (??) provides a clean fallback only when a value is null or undefined — not just falsy." },
    { type: "quote", text: "\"Clean code always looks like it was written by someone who cares.\" — Robert C. Martin" },
    { type: "heading", text: "The Power of Array Methods" },
    { type: "paragraph", text: "Methods like flatMap(), Object.groupBy(), and Array.from() with mapping functions can eliminate entire for-loops. Learning to think in terms of transformations rather than mutations is the single biggest leap a JavaScript developer can make." },
    { type: "paragraph", text: "ES2026 also brings new structured clone improvements and better handling of temporal data through the Temporal API, which finally gives JavaScript a robust date/time library without external dependencies." },
  ],
  3: [
    { type: "paragraph", text: "Science says the secret to a sustainable morning routine isn't about waking up at 5am — it's about designing a sequence that aligns with your chronotype, energy levels, and actual life circumstances." },
    { type: "heading", text: "Start With Your Why" },
    { type: "paragraph", text: "Before designing your routine, ask yourself: what do I want mornings to feel like? Energized? Calm? Creative? Productive? The answer shapes everything that follows. A routine designed for someone else's goals will always feel like a chore." },
    { type: "quote", text: "\"The morning is the rudder of the day.\" — Henry Ward Beecher" },
    { type: "heading", text: "The Non-Negotiables" },
    { type: "paragraph", text: "Research consistently shows that three things improve morning performance: consistent wake time (even on weekends), avoiding screens for the first 20 minutes, and some form of movement before noon. Everything else is customizable." },
  ],
  4: [
    { type: "paragraph", text: "Some apps are instantly enjoyable from the first click. Others take weeks to grow on you. And many — despite being functionally complete — never feel right. What separates the former from the latter is design intention." },
    { type: "heading", text: "Reduce Cognitive Load" },
    { type: "paragraph", text: "Great apps make decisions simple. Airbnb's search filters are progressive — they reveal complexity only when needed. Notion's empty states guide you toward the first action. Linear's keyboard-first interface rewards power users without overwhelming newcomers." },
    { type: "quote", text: "\"Design is not just what it looks like and feels like. Design is how it works.\" — Steve Jobs" },
    { type: "heading", text: "Speed as a Feature" },
    { type: "paragraph", text: "Linear famously made performance a design principle. Every interaction is instant, or appears to be. This isn't just an engineering choice — it communicates respect for the user's time. The fastest app is always the one that feels most polished." },
  ],
  5: [
    { type: "paragraph", text: "After interviewing 50 founders who successfully closed their first round of funding, patterns emerged that no pitch deck template could capture. Here's what actually separates fundable ideas from great ideas that don't get funded." },
    { type: "heading", text: "Investors Back People, Not Plans" },
    { type: "paragraph", text: "Every founder we spoke to emphasized the same thing: investors made their decision based on the team before the product. Conviction, domain expertise, and the ability to articulate a clear problem drove more term sheets than any financial projection." },
    { type: "quote", text: "\"I fund missionaries, not mercenaries.\" — John Doerr, Kleiner Perkins" },
    { type: "heading", text: "The Unfair Advantage" },
    { type: "paragraph", text: "The founders who raised fastest could clearly articulate why they — specifically — were positioned to win this market. Whether that was 10 years of industry experience, a proprietary dataset, or a network that took decades to build, investors want to know why you and why now." },
  ],
  6: [
    { type: "paragraph", text: "Clutter isn't just an aesthetic problem. Research from Princeton's Neuroscience Institute shows that visual clutter actively competes for your brain's attention, reducing your capacity for focus and creative thinking." },
    { type: "heading", text: "The One-In-One-Out Rule" },
    { type: "paragraph", text: "For physical workspaces, the single most effective rule is one-in-one-out. Every new item that enters your desk requires removing something. This forces intentionality and prevents the gradual accumulation that kills focus over time." },
    { type: "quote", text: "\"Simplicity is the ultimate sophistication.\" — Leonardo da Vinci" },
    { type: "heading", text: "Digital Minimalism" },
    { type: "paragraph", text: "Your digital workspace needs the same care. Limit browser tabs. Use one tool per job category. Archive aggressively. The goal isn't bareness — it's intentionality. Every element in your environment should be either functional or inspiring. Nothing else belongs." },
  ],
};

const baseComments = [
  { id: 1, author: "Michael Chen", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Michael", date: "Mar 5, 2026", text: "This is one of the clearest explanations I've read. The analogies really clicked for me. Thanks!", likes: 12 },
  { id: 2, author: "Ava Williams", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ava", date: "Mar 5, 2026", text: "Great read! I'd love a follow-up on the nuances you glossed over here. Really helpful for beginners.", likes: 8 },
  { id: 3, author: "Raj Patel", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Raj", date: "Mar 4, 2026", text: "Bookmarked! Sharing this with my team. Exactly the right level for non-technical stakeholders.", likes: 5 },
];

export default function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const postId = id ? parseInt(id, 10) : 1;
  const article = allPosts.find(p => p.id === postId) ?? allPosts[0];
  const content = articleContents[article.id] ?? articleContents[1];
  const relatedPosts = allPosts.filter(p => p.id !== article.id).slice(0, 3);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});
  const [localComments, setLocalComments] = useState(baseComments);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCommentLike = (commentId: number) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "You",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=You",
      date: "Just now",
      text: commentText.trim(),
      likes: 0,
    };
    setLocalComments(prev => [newComment, ...prev]);
    setCommentText("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to articles
        </button>

        {/* Category Badge */}
        <div className="mb-5">
          <Link
            to={`/explore?category=${article.category}`}
            className={`text-xs px-3 py-1.5 rounded-full ${article.categoryColor} hover:opacity-80 transition-opacity`}
            style={{ fontWeight: 600 }}
          >
            {article.category}
          </Link>
        </div>

        {/* Title */}
        <h1
          className="text-gray-900 mb-4"
          style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.025em", lineHeight: 1.2 }}
        >
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-xl mb-8" style={{ lineHeight: 1.6 }}>
          {article.excerpt}
        </p>

        {/* Author Row */}
        <div className="flex items-center justify-between py-5 border-y border-gray-100 mb-8">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full bg-gray-100 object-cover ring-2 ring-gray-100"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="text-sm text-gray-900 hover:underline underline-offset-2 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  {article.author.name}
                </Link>
                <button
                  className="text-xs px-2.5 py-0.5 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
                  style={{ fontWeight: 500 }}
                >
                  Follow
                </button>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                <Clock size={11} />
                <span>{article.readTime}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Article Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-full transition-all duration-200 ${
                liked ? "bg-rose-50 text-rose-500" : "text-gray-400 hover:bg-gray-100 hover:text-rose-400"
              }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              <span style={{ fontWeight: 500 }}>{likeCount}</span>
            </button>
            <button
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
              onClick={() => {
                const el = document.getElementById("comments-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <MessageCircle size={16} />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full transition-all duration-200 ${
                bookmarked ? "bg-amber-50 text-amber-500" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
              >
                <Share2 size={16} />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg shadow-gray-200/60 p-1.5 min-w-44 z-20">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowShareMenu(false)}
                    className="w-full flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    <Twitter size={14} />
                    Share on Twitter
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    <Link2 size={14} />
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                </div>
              )}
            </div>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-10 shadow-md">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover"
          />
          <p className="text-center text-xs text-gray-400 mt-2 italic">
            Photo via Unsplash
          </p>
        </div>

        {/* Article Content */}
        <div className="mb-12">
          {content.map((block, idx) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={idx}
                  className="text-gray-900 mt-10 mb-4"
                  style={{ fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.015em" }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-gray-900 pl-5 my-7 text-gray-600 italic"
                  style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p
                key={idx}
                className="text-gray-700 mb-5"
                style={{ fontSize: "1.05rem", lineHeight: 1.85 }}
              >
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-gray-100">
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/explore?q=${encodeURIComponent(tag)}`}
                className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 px-3.5 py-1.5 rounded-full transition-all duration-200"
                style={{ fontWeight: 500 }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Clap / Like CTA */}
        <div className="flex flex-col items-center py-10 border-y border-gray-100 mb-10 gap-3">
          <button
            onClick={handleLike}
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              liked
                ? "border-rose-400 bg-rose-50 text-rose-500 scale-110"
                : "border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400 hover:bg-rose-50"
            }`}
          >
            <Heart size={26} fill={liked ? "currentColor" : "none"} />
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
              {likeCount} people found this helpful
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Click the heart if you enjoyed this article</p>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 mb-12">
          <div className="flex items-start gap-4">
            <Link to="/profile">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-full bg-gray-200 object-cover flex-shrink-0"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Written by</p>
                  <Link to="/profile" className="text-gray-900 hover:underline underline-offset-2" style={{ fontWeight: 700 }}>
                    {article.author.name}
                  </Link>
                </div>
                <button
                  className="text-sm px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
                  style={{ fontWeight: 600 }}
                >
                  Follow
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2" style={{ lineHeight: 1.6 }}>
                {article.author.bio ?? "Writer at Blogify. Exploring ideas that matter."}
              </p>
              <Link
                to="/profile"
                className="text-xs text-gray-500 hover:text-black transition-colors duration-200 mt-2 inline-block"
                style={{ fontWeight: 500 }}
              >
                View all posts →
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-16" id="comments-section">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-black"></span>
            <h2 className="text-sm uppercase tracking-widest text-gray-500">
              Responses ({localComments.length})
            </h2>
          </div>

          {/* Comment Input */}
          <div className="flex items-start gap-3 mb-8">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=You"
              alt="You"
              className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-gray-400 transition-colors duration-200"
                style={{ lineHeight: 1.6 }}
              />
              {commentText.trim() && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handlePostComment}
                    className="flex items-center gap-1.5 text-xs px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200"
                    style={{ fontWeight: 600 }}
                  >
                    <Send size={12} />
                    Post response
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-6">
            {localComments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">{comment.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600" style={{ lineHeight: 1.65 }}>
                      {comment.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 px-1">
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1 text-xs transition-colors duration-200 ${
                        commentLikes[comment.id] ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
                      }`}
                    >
                      <Heart size={12} fill={commentLikes[comment.id] ? "currentColor" : "none"} />
                      <span>{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                    </button>
                    <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors duration-200">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors duration-200 mt-2">
              <ChevronDown size={15} />
              Show more responses
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="bg-gray-50 border-t border-gray-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-black"></span>
            <h2 className="text-sm uppercase tracking-widest text-gray-500">More to Read</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
