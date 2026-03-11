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

export const allPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Large Language Models: A Beginner's Guide",
    excerpt:
      "Large language models like GPT have taken the world by storm. But what are they really, and how do they work under the hood?",
    image:
      "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMGFic3RyYWN0fGVufDF8fHx8MTc3MjY5MDg5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah",
      bio: "AI researcher & technical writer. Simplifying complex tech for everyone.",
    },
    date: "Mar 4, 2026",
    readTime: "6 min read",
    category: "AI",
    categoryColor: "bg-emerald-100 text-emerald-700",
    likes: 248,
    tags: ["AI", "Machine Learning", "Technology", "Deep Learning"],
  },
  {
    id: 2,
    title: "10 JavaScript Tips Every Developer Should Know in 2026",
    excerpt:
      "From optional chaining to the latest ES2026 features, here are the JavaScript tricks that will make your code cleaner and faster.",
    image:
      "https://images.unsplash.com/photo-1753998943413-8cba1b923c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRhcmslMjBzY3JlZW4lMjB0ZXJtaW5hbHxlbnwxfHx8fDE3NzI3ODQxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Emily Zhao",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Emily",
      bio: "Full-stack developer. Writing about JS, React, and web performance.",
    },
    date: "Mar 3, 2026",
    readTime: "5 min read",
    category: "Programming",
    categoryColor: "bg-violet-100 text-violet-700",
    likes: 184,
    tags: ["JavaScript", "Programming", "Web Dev", "ES2026"],
  },
  {
    id: 3,
    title: "How to Build a Morning Routine That Actually Sticks",
    excerpt:
      "Forget the 5am wake-up hype. Science-backed strategies for creating a morning routine tailored to your energy and lifestyle.",
    image:
      "https://images.unsplash.com/photo-1758272422634-e8ed8e252a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBtb3JuaW5nfGVufDF8fHx8MTc3Mjc4NDEwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya",
      bio: "Wellness coach & lifestyle blogger. Helping you live with intention.",
    },
    date: "Mar 2, 2026",
    readTime: "4 min read",
    category: "Lifestyle",
    categoryColor: "bg-rose-100 text-rose-700",
    likes: 312,
    tags: ["Lifestyle", "Health", "Productivity", "Wellness"],
  },
  {
    id: 4,
    title: "The Design Principles Behind the World's Most Loved Apps",
    excerpt:
      "What makes Airbnb, Notion, and Linear so satisfying to use? We break down the design decisions that set them apart.",
    image:
      "https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBVWCUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzI3ODQwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Lucas Martin",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Lucas",
      bio: "Product designer at a Series B startup. Obsessed with great UX.",
    },
    date: "Mar 1, 2026",
    readTime: "7 min read",
    category: "Design",
    categoryColor: "bg-amber-100 text-amber-700",
    likes: 156,
    tags: ["Design", "UX", "Product", "Apps"],
  },
  {
    id: 5,
    title: "From Zero to Funding: Lessons from 50 Startup Founders",
    excerpt:
      "We interviewed 50 founders who raised their first round. Here's what they all had in common — and what surprised us most.",
    image:
      "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjB0ZWNobm9sb2d5JTIwZGlnaXRhbCUyMGlubm92YXRpb258ZW58MXx8fHwxNzcyNzg0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex",
      bio: "Startup journalist. Talking to founders, VCs, and operators.",
    },
    date: "Feb 28, 2026",
    readTime: "10 min read",
    category: "Startup",
    categoryColor: "bg-cyan-100 text-cyan-700",
    likes: 421,
    tags: ["Startup", "Entrepreneurship", "Funding", "Business"],
  },
  {
    id: 6,
    title: "The Minimalist Workspace: Designing for Deep Focus",
    excerpt:
      "Clutter is the enemy of clarity. Here's how to design a workspace — physical or digital — that amplifies your best thinking.",
    image:
      "https://images.unsplash.com/photo-1768839723684-5824a8f02cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzayUyMHdyaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyNzg0MDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Nina Kowalski",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Nina",
      bio: "Minimalism advocate. Writing about focus, design, and slow living.",
    },
    date: "Feb 27, 2026",
    readTime: "5 min read",
    category: "Lifestyle",
    categoryColor: "bg-rose-100 text-rose-700",
    likes: 289,
    tags: ["Productivity", "Minimalism", "Focus", "Workspace"],
  },
];

export const profilePosts: BlogPost[] = allPosts.filter(p => p.author.name === "Sarah Mitchell" || p.id <= 3);
