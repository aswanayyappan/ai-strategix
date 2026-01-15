import { Mail, Lock, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LoginPageProps {
  onAuth: () => void;
  onBack: () => void;
  onSignUp: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export function LoginPage({ onAuth, onBack, onSignUp, theme, setTheme }: LoginPageProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isDark = theme === "dark";

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Cursor Light Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: isDark
            ? `radial-gradient(
                800px at ${cursor.x}px ${cursor.y}px,
                rgba(255,255,255,0.07),
                transparent 75%
              )`
            : `radial-gradient(
                900px at ${cursor.x}px ${cursor.y}px,
                rgba(37,99,235,0.18),
                rgba(37,99,235,0.10) 40%,
                rgba(37,99,235,0.04) 60%,
                transparent 80%
              )`,
        }}
      />

      {/* Theme Toggle */}
      <div className="fixed top-4 md:top-6 right-4 md:right-6 z-20">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`rounded-full p-2 md:p-3 border backdrop-blur-3xl transition-all
            ${isDark
              ? "bg-white/5 border-white/15 hover:bg-white/10"
              : "bg-black/5 border-black/15 hover:bg-black/10"}`}
          style={{
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          {isDark ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 py-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-6 md:mb-8 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            ← Back to home
          </button>

          {/* Login Card */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <h2
                className="text-2xl md:text-3xl text-foreground mb-2 md:mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Welcome Back
              </h2>
              <p
                className="text-sm md:text-base text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Sign in to your AI Business Strategist account
              </p>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label
                  className="block text-sm text-muted-foreground mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-input-background border border-input text-foreground pl-12 pr-4 py-3.5 md:py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all min-h-[48px]"
                    style={{ fontFamily: 'var(--font-body)' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm text-muted-foreground mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-input-background border border-input text-foreground pl-12 pr-4 py-3.5 md:py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all min-h-[48px]"
                    style={{ fontFamily: 'var(--font-body)' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full px-6 py-4 rounded-full transition-all mt-6 border min-h-[48px] ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="bg-card px-4 text-muted-foreground"
                  style={{ fontFamily: 'var(--font-data)' }}
                >
                  Or
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={onAuth}
                className={`w-full px-6 py-4 rounded-full transition-all flex items-center justify-center gap-3 border ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" opacity="0.8" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.6" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" opacity="0.4" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={onAuth}
                className={`w-full px-6 py-4 rounded-full transition-all flex items-center justify-center gap-3 border ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Continue with LinkedIn
              </button>

              <button
                onClick={onAuth}
                className={`w-full px-6 py-4 rounded-full transition-all flex items-center justify-center gap-3 border ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </button>

              <button
                onClick={onAuth}
                className={`w-full px-6 py-4 rounded-full transition-all flex items-center justify-center gap-3 border ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <p
              className="text-sm text-center mt-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-muted-foreground">Don't have an account? </span>
              <button
                onClick={onSignUp}
                className="text-foreground underline hover:text-white transition-colors"
              >
                Sign up here
              </button>
            </p>

            {/* Terms */}
            <p
              className="text-xs text-muted-foreground text-center mt-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}