import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
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

function FieldWrapper({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-all duration-200 bg-white ${
      focused ? "border-gray-900 shadow-sm shadow-gray-200" : "border-gray-200 hover:border-gray-300"
    }`}>
      {children}
    </div>
  );
}

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const passwordRules = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordsMismatch) return;
    setError("");
    setIsLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/", { replace: true });
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
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Google sign-up failed. Please try again.");
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
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-200 text-sm group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to home
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs" style={{ fontWeight: 700 }}>B</span>
          </div>
          <span className="text-xl tracking-tight text-gray-900 hidden sm:block" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>Blogify</span>
        </Link>
        <div className="text-sm text-gray-500">
          Have an account?{" "}
          <Link to="/signin" className="text-black hover:underline underline-offset-2" style={{ fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 sm:px-10">

            {/* Logo & Heading */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-black/20">
                <span className="text-white text-2xl" style={{ fontWeight: 800 }}>B</span>
              </div>
              <h1 className="text-gray-900 mb-1.5" style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
                Create your account
              </h1>
              <p className="text-gray-500 text-sm">Join thousands of readers and writers today.</p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3.5 rounded-xl mb-5">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-gray-700 text-sm px-4 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontWeight: 500 }}
            >
              {isGoogleLoading ? <Loader2 size={16} className="animate-spin text-gray-400" /> : <GoogleIcon />}
              {isGoogleLoading ? "Signing up…" : "Sign up with Google"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-gray-400 text-xs">or sign up with email</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Full Name</label>
                <FieldWrapper focused={nameFocused}>
                  <User size={16} className={nameFocused ? "text-gray-700" : "text-gray-400"} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder="Jane Doe"
                    required
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                  />
                </FieldWrapper>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Email Address</label>
                <FieldWrapper focused={emailFocused}>
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
                </FieldWrapper>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Password</label>
                <FieldWrapper focused={passwordFocused}>
                  <Lock size={16} className={passwordFocused ? "text-gray-700" : "text-gray-400"} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPasswordTouched(true); }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="••••••••"
                    required
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </FieldWrapper>
                {passwordTouched && password.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1 px-1">
                    {passwordRules.map(rule => (
                      <div key={rule.label} className="flex items-center gap-2">
                        {rule.met
                          ? <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                          : <XCircle size={12} className="text-gray-300 flex-shrink-0" />}
                        <span className={`text-xs transition-colors duration-200 ${rule.met ? "text-emerald-600" : "text-gray-400"}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600" style={{ fontWeight: 600 }}>Confirm Password</label>
                <div className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 transition-all duration-200 bg-white ${
                  confirmFocused
                    ? passwordsMismatch ? "border-rose-400 shadow-sm shadow-rose-100"
                      : passwordsMatch ? "border-emerald-400 shadow-sm shadow-emerald-100"
                      : "border-gray-900 shadow-sm shadow-gray-200"
                    : passwordsMismatch ? "border-rose-300"
                    : passwordsMatch ? "border-emerald-300"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                  <Lock size={16} className={passwordsMismatch ? "text-rose-400" : passwordsMatch ? "text-emerald-500" : confirmFocused ? "text-gray-700" : "text-gray-400"} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmFocused(true)}
                    onBlur={() => setConfirmFocused(false)}
                    placeholder="••••••••"
                    required
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordsMismatch && <p className="text-xs text-rose-500 px-1 flex items-center gap-1.5"><XCircle size={11} /> Passwords don't match</p>}
                {passwordsMatch && <p className="text-xs text-emerald-600 px-1 flex items-center gap-1.5"><CheckCircle2 size={11} /> Passwords match</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 mt-1">
                <div className="relative mt-0.5">
                  <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="sr-only peer" />
                  <label htmlFor="terms" className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200 block flex-shrink-0 ${agreed ? "bg-black border-black" : "border-gray-300 bg-white hover:border-gray-400"}`}>
                    {agreed && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </label>
                </div>
                <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer leading-relaxed select-none">
                  I agree to the{" "}
                  <span className="text-gray-800 hover:underline underline-offset-2 cursor-pointer" style={{ fontWeight: 600 }}>Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-gray-800 hover:underline underline-offset-2 cursor-pointer" style={{ fontWeight: 600 }}>Privacy Policy</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!agreed || !!passwordsMismatch || isLoading || isGoogleLoading}
                className={`w-full flex items-center justify-center gap-2 text-sm py-3.5 rounded-xl transition-all duration-200 mt-2 shadow-sm ${
                  agreed && !passwordsMismatch && !isLoading && !isGoogleLoading
                    ? "bg-black text-white hover:bg-gray-800 active:scale-[0.99] shadow-black/20 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                }`}
                style={{ fontWeight: 600 }}
              >
                {isLoading ? <><Loader2 size={15} className="animate-spin" /> Creating account…</> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-black hover:underline underline-offset-2 transition-all duration-200" style={{ fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6 px-4">
            Blogify is free forever. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
