import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, Image as ImageIcon,
  Quote, Code, AlignLeft, Eye, Save, Send, X, ChevronDown, Tag, Upload, CheckCircle2
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { label: "AI", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "Programming", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { label: "Design", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "Lifestyle", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { label: "Startup", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { label: "Travel", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Science", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { label: "Health", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { label: "Finance", color: "bg-lime-100 text-lime-700 border-lime-200" },
  { label: "Technology", color: "bg-blue-100 text-blue-700 border-blue-200" },
];

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function ToolbarButton({ icon, label, active = false, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      {icon}
    </button>
  );
}

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [draftSaved, setDraftSaved] = useState(false);
  const [published, setPublished] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const selectedCat = CATEGORIES.find(c => c.label === selectedCategory);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim() && tags.length < 5) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, "");
      if (t && !tags.includes(t)) setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const insertMarkdown = (prefix: string, suffix = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end);
    const before = content.slice(0, start);
    const after = content.slice(end);
    const newText = before + prefix + (selected || "text") + suffix + after;
    setContent(newText);
    setTimeout(() => {
      el.focus();
      const newPos = start + prefix.length + (selected || "text").length + suffix.length;
      el.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handlePublish = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/create" } });
      return;
    }
    if (!title.trim()) return;
    setPublished(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toolbarActions = [
    { icon: <Bold size={14} />, label: "Bold", action: () => insertMarkdown("**", "**") },
    { icon: <Italic size={14} />, label: "Italic", action: () => insertMarkdown("_", "_") },
    { icon: <Heading2 size={14} />, label: "Heading 2", action: () => insertMarkdown("\n## ", "") },
    { icon: <Heading3 size={14} />, label: "Heading 3", action: () => insertMarkdown("\n### ", "") },
    { icon: <Quote size={14} />, label: "Quote", action: () => insertMarkdown("\n> ", "") },
    { icon: <Code size={14} />, label: "Code", action: () => insertMarkdown("`", "`") },
    { icon: <List size={14} />, label: "Bullet List", action: () => insertMarkdown("\n- ", "") },
    { icon: <ListOrdered size={14} />, label: "Numbered List", action: () => insertMarkdown("\n1. ", "") },
    { icon: <Link2 size={14} />, label: "Link", action: () => insertMarkdown("[", "](url)") },
    { icon: <ImageIcon size={14} />, label: "Image URL", action: () => insertMarkdown("![alt](", ")") },
  ];

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const selectedCategoryObj = CATEGORIES.find(c => c.label === selectedCategory);

  if (published) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <div className="text-center">
          <h2 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Published!</h2>
          <p className="text-gray-500 text-sm">Your story is live. Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      {/* Editor Header Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <AlignLeft size={13} />
            <span>{wordCount} words</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{readTime} min read</span>
            {draftSaved && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={11} /> Draft saved
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border transition-all duration-200 ${
                previewMode
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800"
              }`}
              style={{ fontWeight: 500 }}
            >
              <Eye size={12} />
              {previewMode ? "Editing" : "Preview"}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
              style={{ fontWeight: 500 }}
            >
              <Save size={12} />
              Save Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-sm"
              style={{ fontWeight: 600 }}
            >
              <Send size={12} />
              {isAuthenticated ? "Publish" : "Sign in to Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Writing Area */}
          <div className="flex-1 min-w-0">

            {previewMode ? (
              /* Preview Mode */
              <div className="prose-like">
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full h-72 object-cover rounded-2xl mb-8"
                  />
                )}
                {selectedCategoryObj && (
                  <span className={`inline-block text-xs px-3 py-1 rounded-full border mb-4 ${selectedCategoryObj.color}`} style={{ fontWeight: 600 }}>
                    {selectedCategoryObj.label}
                  </span>
                )}
                <h1 className="text-gray-900 mb-3" style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                  {title || "Your blog title will appear here"}
                </h1>
                {subtitle && (
                  <p className="text-gray-500 text-lg mb-6" style={{ lineHeight: 1.6 }}>
                    {subtitle}
                  </p>
                )}
                <div className="h-px bg-gray-100 mb-6"></div>
                <div className="text-gray-700 text-base whitespace-pre-wrap" style={{ lineHeight: 1.8 }}>
                  {content || <span className="text-gray-400">Your blog content will appear here...</span>}
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                    {tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Edit Mode */
              <>
                {/* Cover Image */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`w-full rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer mb-7 overflow-hidden ${
                    coverPreview ? "border-transparent" : "border-gray-200 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {coverPreview ? (
                    <div className="relative group">
                      <img src={coverPreview} alt="Cover" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl">
                        <span className="text-white text-sm flex items-center gap-2" style={{ fontWeight: 500 }}>
                          <Upload size={16} /> Change Cover
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <ImageIcon size={20} className="text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500" style={{ fontWeight: 500 }}>Click to upload cover image</p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP up to 10MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </div>

                {/* Category Selector */}
                <div className="relative mb-5">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
                      selectedCat
                        ? `${selectedCat.color} border-current`
                        : "border-gray-200 text-gray-500 hover:border-gray-400 bg-white"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    <Tag size={13} />
                    {selectedCategory || "Select category"}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`} />
                  </button>

                  {categoryOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/60 p-2 z-20 min-w-48">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => { setSelectedCategory(cat.label); setCategoryOpen(false); }}
                          className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all duration-150 ${
                            selectedCategory === cat.label ? "bg-gray-100" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${cat.color}`} style={{ fontWeight: 600 }}>
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <textarea
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Your blog title..."
                  rows={2}
                  className="w-full text-gray-900 placeholder-gray-300 outline-none resize-none border-none bg-transparent mb-2"
                  style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                />

                {/* Subtitle */}
                <textarea
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="Add a short subtitle or description..."
                  rows={2}
                  className="w-full text-gray-500 placeholder-gray-300 outline-none resize-none border-none bg-transparent text-lg mb-6"
                  style={{ lineHeight: 1.6 }}
                />

                <div className="h-px bg-gray-100 mb-6"></div>

                {/* Formatting Toolbar */}
                <div className="flex items-center gap-0.5 flex-wrap bg-gray-50 border border-gray-200 rounded-xl p-1.5 mb-4">
                  {toolbarActions.map(({ icon, label, action }) => (
                    <ToolbarButton key={label} icon={icon} label={label} onClick={action} />
                  ))}
                </div>

                {/* Content Textarea */}
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Tell your story... (supports markdown formatting)"
                  rows={24}
                  className="w-full text-gray-700 placeholder-gray-300 outline-none resize-none border-none bg-transparent text-base"
                  style={{ lineHeight: 1.85 }}
                />
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-36 flex flex-col gap-5">

              {/* Writing Tips */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3" style={{ fontWeight: 600 }}>
                  Writing Tips
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Use **text** for bold",
                    "Use _text_ for italic",
                    "Use ## for headings",
                    "Use > for quotes",
                    "Use `code` for inline code",
                    "Use - for bullet lists",
                  ].map(tip => (
                    <li key={tip} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <code className="text-gray-600 bg-white border border-gray-200 rounded px-1">{tip}</code>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3" style={{ fontWeight: 600 }}>
                  Tags <span className="text-gray-400 normal-case tracking-normal" style={{ fontWeight: 400 }}>({tags.length}/5)</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add tag, press Enter..."
                  disabled={tags.length >= 5}
                  className="w-full text-xs text-gray-700 placeholder-gray-400 outline-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:border-gray-400 transition-colors disabled:opacity-40"
                />
              </div>

              {/* Publish Settings */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4" style={{ fontWeight: 600 }}>
                  Publish Settings
                </h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center justify-between">
                    <span className="text-xs text-gray-600" style={{ fontWeight: 500 }}>Allow comments</span>
                    <div className="w-8 h-4 bg-black rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-xs text-gray-600" style={{ fontWeight: 500 }}>Featured post</span>
                    <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handlePublish}
                  className="w-full flex items-center justify-center gap-2 text-sm py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-sm shadow-black/20"
                  style={{ fontWeight: 600 }}
                >
                  <Send size={14} />
                  {isAuthenticated ? "Publish Story" : "Sign in to Publish"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-full flex items-center justify-center gap-2 text-sm py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
                  style={{ fontWeight: 500 }}
                >
                  <Save size={14} />
                  {draftSaved ? "Draft Saved ✓" : "Save as Draft"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}