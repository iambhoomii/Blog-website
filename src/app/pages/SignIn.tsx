import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
      </g>
    </svg>
  );
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from ?? "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* Top bar */}
      <div className="w-full px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-200 text-sm group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to home
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs" style={{ fontWeight: 700 }}>B</span>
          </div>
          <span className="text-xl tracking-tight text-gray-900 hidden sm:block" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
            Blogify
          </span>
        </Link>
        <div className="text-sm text-gray-500">
          New here?{" "}
          <Link to="/signup" className="text-black hover:underline underline-offset-2" style={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 sm:px-10">

            {/* Logo & Heading */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-black/20">
                <span className="text-white text-2xl" style={{ fontWeight: 800 }}>B</span>
              </div>
              <h1 className="text-gray-900 mb-1.5" style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
                Sign in to Blogify
              </h1>
              <p className="text-gray-500 text-sm">Welcome back! Continue your reading journey.</p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3.5 rounded-xl mb-5">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-gray-700 text-sm px-4 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontWeight: 500 }}
            >
              {isGoogleLoading ? <Loader2 size={16} className="animate-spin text-gray-400" /> : <GoogleIcon />}
              {isGoogleLoading ? "Signing in…" : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-gray-400 text-xs">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Email address</label>
                <div className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-all duration-200 bg-white ${
                  emailFocused ? "border-gray-900 shadow-sm shadow-gray-200" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <Mail size={16} className={emailFocused ? "text-gray-700" : "text-gray-400"} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="you@example.com"
                    required
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Password</label>
                  <button type="button" className="text-xs text-gray-500 hover:text-black transition-colors duration-200">
                    Forgot password?
                  </button>
                </div>
                <div className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-all duration-200 bg-white ${
                  passwordFocused ? "border-gray-900 shadow-sm shadow-gray-200" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <Lock size={16} className={passwordFocused ? "text-gray-700" : "text-gray-400"} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="••••••••"
                    required
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5 mt-1">
                <div className="relative">
                  <input type="checkbox" id="remember" className="sr-only peer" />
                  <label
                    htmlFor="remember"
                    className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center peer-checked:bg-black peer-checked:border-black transition-all duration-200 block"
                  />
                </div>
                <label htmlFor="remember" className="text-xs text-gray-500 cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm py-3.5 rounded-xl hover:bg-gray-800 active:scale-[0.99] transition-all duration-200 mt-2 shadow-sm shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                {isLoading ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black hover:underline underline-offset-2 transition-all duration-200" style={{ fontWeight: 600 }}>
                Create a free account
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6 px-4">
            By signing in, you agree to our{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors">Terms of Service</span>
            {" "}and{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-gray-600 transition-colors">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
