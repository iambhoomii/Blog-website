import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function NewsletterBanner() {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">

          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Mail size={22} className="text-white" />
          </div>

          <h3 className="text-2xl sm:text-3xl text-white mb-3"
          style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            Stay in the loop
          </h3>

           <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Get the best stories delivered to your inbox every week. No spam, ever.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <p className="text-sm text-emerald-800 font-semibold">
                Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">

              <div className="flex gap-2 w-full max-w-md">
                <Mail size={16} className="text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-full outline-none focus:border-white/30 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-black text-sm px-5 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap" 
                style={{ fontWeight: 600 }}
              >
                Subscribe
                <ArrowRight size={14} />
              </button>

            </form>
            
          )}
          <p className="text-xs text-gray-600">
            Join 12,000+ readers. Unsubscribe anytime.
          </p>

        </div>
      </div>
    </div>
  );
}