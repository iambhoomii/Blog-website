import { useState } from "react";
import { Twitter, Github, Linkedin, Instagram, Rss, Mail, CheckCircle2, ArrowRight } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
  Explore: ["Technology", "Programming", "Design", "Lifestyle", "Startup"],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Rss, label: "RSS Feed", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>B</span>
              </div>
              <span className="text-xl text-gray-900" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
                Blogify
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              A place for curious minds. Discover stories, thinking, and expertise from writers on any topic that matters to you.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-gray-900 text-xs uppercase tracking-widest mb-4" style={{ fontWeight: 600 }}>
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">© 2026 Blogify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 text-xs hover:text-gray-600 transition-colors duration-200">Privacy</a>
            <a href="#" className="text-gray-400 text-xs hover:text-gray-600 transition-colors duration-200">Terms</a>
            <a href="#" className="text-gray-400 text-xs hover:text-gray-600 transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
