import { useState, useRef, useEffect } from "react";
import { Search, PenSquare, Menu, X, Bell, ChevronDown, LogOut, BookOpen, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/explore" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Sarah Mitchell liked your post", time: "2m ago", unread: true },
  { id: 2, text: "Emily Zhao started following you", time: "1h ago", unread: true },
  { id: 3, text: "Your post was featured on Blogify", time: "3h ago", unread: false },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.unread).length;

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const handleWriteClick = () => {
    if (isAuthenticated) {
      navigate("/create");
    } else {
      navigate("/signin", { state: { from: "/create" } });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>B</span>
            </div>
            <span className="text-xl tracking-tight text-gray-900 hidden sm:block" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              Blogify
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm px-3.5 py-2 rounded-full transition-all duration-200 ${
                  isActive(link.to)
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500 hover:text-black hover:bg-gray-50"
                }`}
                style={{ fontWeight: isActive(link.to) ? 600 : 400 }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleWriteClick}
              className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-full transition-all duration-200 ${
                location.pathname === "/create"
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
              }`}
              style={{ fontWeight: location.pathname === "/create" ? 600 : 400 }}
            >
              <PenSquare size={14} />
              Write
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-1.5">

            {/* Search */}
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-full px-4 py-1.5"
              >
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="bg-transparent text-sm text-gray-700 outline-none w-44 placeholder-gray-400"
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-black"
              >
                <Search size={18} />
              </button>
            )}

            {isAuthenticated ? (
              /* ── LOGGED-IN STATE ── */
              <>
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className={`relative p-2 rounded-full transition-colors duration-200 ${
                      notifOpen ? "bg-gray-100 text-gray-800" : "text-gray-500 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 overflow-hidden z-50">
                      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                        <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>Notifications</span>
                        <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors" style={{ fontWeight: 500 }}>
                          Mark all read
                        </button>
                      </div>
                      <div className="flex flex-col divide-y divide-gray-50">
                        {MOCK_NOTIFICATIONS.map(notif => (
                          <div
                            key={notif.id}
                            className={`flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? "bg-blue-50/40" : ""}`}
                          >
                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.unread ? "bg-blue-500" : "bg-gray-200"}`}></span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700" style={{ lineHeight: 1.45 }}>{notif.text}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-gray-100 text-center">
                        <button className="text-xs text-gray-500 hover:text-black transition-colors" style={{ fontWeight: 500 }}>
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                    className="flex items-center gap-1.5 p-1 pl-1 pr-2.5 rounded-full hover:bg-gray-100 transition-all duration-200"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full bg-gray-100 object-cover ring-2 ring-gray-100"
                    />
                    <ChevronDown
                      size={13}
                      className={`text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 overflow-hidden z-50">
                      {/* User info */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full bg-gray-100 object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm text-gray-900 truncate" style={{ fontWeight: 600 }}>{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-1.5">
                        {[
                          { icon: User, label: "My Profile", to: "/profile" },
                          { icon: BookOpen, label: "My Blogs", to: "/profile" },
                          { icon: PenSquare, label: "Write a Story", to: "/create" },
                        ].map(item => (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150"
                            style={{ fontWeight: 500 }}
                          >
                            <item.icon size={15} className="text-gray-400" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="p-1.5 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-150"
                          style={{ fontWeight: 500 }}
                        >
                          <LogOut size={15} className="text-rose-400" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* ── GUEST STATE ── */
              <>
                <Link
                  to="/signin"
                  className="text-sm text-gray-600 px-4 py-2 rounded-full hover:text-black hover:bg-gray-100 transition-all duration-200"
                  style={{ fontWeight: 500 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-sm"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 mb-3"
            >
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="bg-transparent text-sm text-gray-700 outline-none flex-1 placeholder-gray-400"
              />
            </form>

            <div className="flex flex-col gap-0.5 mb-3">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-sm py-2.5 px-3 rounded-xl transition-colors ${
                    isActive(link.to) ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                  style={{ fontWeight: isActive(link.to) ? 600 : 400 }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleWriteClick}
                className="flex items-center gap-2 text-sm py-2.5 px-3 rounded-xl text-gray-600 hover:text-black hover:bg-gray-50 transition-colors text-left"
              >
                <PenSquare size={15} />
                Write a story
              </button>
            </div>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl mb-2">
                  <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full bg-gray-100 object-cover" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 truncate" style={{ fontWeight: 600 }}>{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link to="/profile" className="flex items-center gap-2.5 text-sm py-2.5 px-3 rounded-xl text-gray-600 hover:text-black hover:bg-gray-50 transition-colors">
                    <User size={15} className="text-gray-400" /> My Profile
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2.5 text-sm py-2.5 px-3 rounded-xl text-gray-600 hover:text-black hover:bg-gray-50 transition-colors">
                    <BookOpen size={15} className="text-gray-400" /> My Blogs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 text-sm py-2.5 px-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut size={15} className="text-rose-400" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link
                  to="/signin"
                  className="flex-1 text-center text-sm py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center text-sm py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-sm"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
