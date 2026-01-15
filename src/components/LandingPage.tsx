import {
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Sun,
  Moon,
  User,
  Lightbulb,
  Users,
  Search,
  DollarSign,
  Rocket,
  Shield,
  Cpu,
  Package,
  Layers,
  GitBranch,
  Calculator,
  Factory,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DotScreenShader } from "./ui/dot-shader-background";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignUp: () => void;
  onProfile: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export function LandingPage({
  onGetStarted,
  onSignUp,
  onProfile,
  theme,
  setTheme,
}: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);
  const businessMentorRef = useRef<HTMLDivElement | null>(null);
  const hardwareMentorRef = useRef<HTMLDivElement | null>(null);

  const [visibleHero, setVisibleHero] = useState(true);
  const [visibleFeature, setVisibleFeature] = useState(false);
  const [visibleBusinessMentor, setVisibleBusinessMentor] = useState(false);
  const [visibleHardwareMentor, setVisibleHardwareMentor] = useState(false);
  const [offsetHero, setOffsetHero] = useState(0);
  const [offsetFeature, setOffsetFeature] = useState(0);
  const [offsetBusinessMentor, setOffsetBusinessMentor] = useState(0);
  const [offsetHardwareMentor, setOffsetHardwareMentor] = useState(0);


  // 🔐 AUTH STATE (mock – replace with real auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isDark = theme === "dark";

  /* ---------------- SMOOTH SCROLL ---------------- */
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([e]) => setVisibleHero(e.isIntersecting),
      { threshold: 0.2 }
    );
    const featureObserver = new IntersectionObserver(
      ([e]) => setVisibleFeature(e.isIntersecting),
      { threshold: 0.2 }
    );
    const businessMentorObserver = new IntersectionObserver(
      ([e]) => setVisibleBusinessMentor(e.isIntersecting),
      { threshold: 0.2 }
    );
    const hardwareMentorObserver = new IntersectionObserver(
      ([e]) => setVisibleHardwareMentor(e.isIntersecting),
      { threshold: 0.2 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (featureRef.current) featureObserver.observe(featureRef.current);
    if (businessMentorRef.current) businessMentorObserver.observe(businessMentorRef.current);
    if (hardwareMentorRef.current) hardwareMentorObserver.observe(hardwareMentorRef.current);

    const onScroll = () => {
      if (heroRef.current) {
        const r = heroRef.current.getBoundingClientRect();
        setOffsetHero(-r.top / 5);
      }
      if (featureRef.current) {
        const r = featureRef.current.getBoundingClientRect();
        setOffsetFeature(-r.top / 5);
      }
      if (businessMentorRef.current) {
        const r = businessMentorRef.current.getBoundingClientRect();
        setOffsetBusinessMentor(-r.top / 5);
      }
      if (hardwareMentorRef.current) {
        const r = hardwareMentorRef.current.getBoundingClientRect();
        setOffsetHardwareMentor(-r.top / 5);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // window.addEventListener("mousemove", onMouseMove);

    return () => {
      heroObserver.disconnect();
      featureObserver.disconnect();
      businessMentorObserver.disconnect();
      hardwareMentorObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      // window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300
        ${isDark ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      {/* ================= BACKGROUND SHADER ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <DotScreenShader />
        </div>
      </div>

      {/* ================= TOP BAR ================= */}
      <div className="fixed top-4 md:top-6 right-4 md:right-6 z-20 flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
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

        {/* Auth Button */}
        {!isLoggedIn ? (
          <button
            onClick={onSignUp}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full border text-xs md:text-sm font-medium backdrop-blur-3xl transition-all
              ${isDark
                ? "bg-white/5 border-white/15 hover:bg-white/10"
                : "bg-black/5 border-black/15 hover:bg-black/10"}`}
            style={{
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={onProfile}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center backdrop-blur-3xl transition-all
              ${isDark
                ? "bg-white/5 border-white/15 hover:bg-white/10"
                : "bg-black/5 border-black/15 hover:bg-black/10"}`}
            style={{
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <User size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        )}
      </div>

      {/* ================= NAVIGATION BAR ================= */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-30
          backdrop-blur-3xl border rounded-full shadow-lg hidden md:block
          ${isDark
            ? "bg-white/5 border-white/15"
            : "bg-black/5 border-black/15"}
        `}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="flex items-center gap-2 px-6 py-3">
          {/* Nav Links */}
          <button
            onClick={() => scrollToSection(heroRef)}
            className={`px-5 py-2 rounded-full text-sm transition-all
              ${isDark ? "hover:bg-white/15" : "hover:bg-black/15"}
            `}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection(featureRef)}
            className={`px-5 py-2 rounded-full text-sm transition-all
              ${isDark ? "hover:bg-white/15" : "hover:bg-black/15"}
            `}
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection(businessMentorRef)}
            className={`px-5 py-2 rounded-full text-sm transition-all
              ${isDark ? "hover:bg-white/15" : "hover:bg-black/15"}
            `}
          >
            Business Mentor
          </button>

          <button
            onClick={() => scrollToSection(hardwareMentorRef)}
            className={`px-5 py-2 rounded-full text-sm transition-all
              ${isDark ? "hover:bg-white/15" : "hover:bg-black/15"}
            `}
          >
            Hardware Mentor
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8">
        <div
          ref={heroRef}
          style={{ transform: `translateY(-${offsetHero}px)` }}
          className={`max-w-4xl mx-auto text-center transition-opacity duration-700
            ${visibleHero ? "opacity-100" : "opacity-0"}
          `}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 tracking-tight px-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AI Business Strategist
          </h1>

          <p className="text-lg md:text-2xl opacity-70 mb-6 md:mb-8 px-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            An Autonomous AI That Thinks Like a CEO
          </p>

          <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A single prompt generates executive-level business, stock, product,
            and risk analysis with structured insights, forecasts, and
            actionable plans.
          </p>

          <button
            onClick={onGetStarted}
            className={`px-8 md:px-12 py-4 md:py-5 rounded-full inline-flex items-center gap-3 border backdrop-blur-3xl transition-all text-sm md:text-base
              ${isDark
                ? "bg-white/5 border-white/15 hover:bg-white/10"
                : "bg-black/5 border-black/15 hover:bg-black/10"}`}
            style={{
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Enter Strategy Prompt
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative z-10 py-20 md:py-40 px-4 md:px-8">
        <div
          ref={featureRef}
          style={{ transform: `translateY(-${offsetFeature}px)` }}
          className={`max-w-7xl mx-auto transition-opacity duration-700
            ${visibleFeature ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="max-w-3xl mb-16 md:mb-24 mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 tracking-tight px-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why Enterprises Choose Us
            </h2>
            <p className="opacity-60 px-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Built for decision-makers who need clarity, speed, and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
            {[Sparkles, Zap, Globe].map((Icon, i) => {
              const [isHovered, setIsHovered] = useState(false);
              const [rotations, setRotations] = useState(0);

              useEffect(() => {
                if (isHovered) {
                  // First rotation happens immediately
                  setRotations(prev => prev + 1);
                  // Then subsequent rotations happen every 1 second
                  const interval = setInterval(() => {
                    setRotations(prev => prev + 1);
                  }, 1000);
                  return () => clearInterval(interval);
                }
              }, [isHovered]);

              return (
                <div
                  key={i}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setRotations(0);
                  }}
                  className={`rounded-2xl p-6 md:p-10 border transition-all
                    ${isDark
                      ? "border-white/10 hover:border-white/30"
                      : "border-black/10 hover:border-black/30"}
                  `}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl border flex items-center justify-center
                      ${isDark ? "border-white/10" : "border-black/10"}
                    `}
                  >
                    <div
                      style={{
                        transform: `rotate(${rotations * 360}deg)`,
                        transition: 'transform 0.6s ease-in-out'
                      }}
                    >
                      <Icon strokeWidth={1.2} size={20} className="md:w-6 md:h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl mb-3 md:mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Enterprise-Grade Intelligence
                  </h3>
                  <p className="opacity-60 text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Structured insights designed for real strategic decisions.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= MENTOR SHOWCASE ================= */}
      <section className="relative z-10 py-20 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-40">

          {/* -------- Business Mentor -------- */}
          <div ref={businessMentorRef} style={{ transform: `translateY(-${offsetBusinessMentor}px)` }}>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 tracking-tight text-center transition-all duration-700 delay-100 px-4
        ${visibleBusinessMentor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Launch Your Business with Confidence
            </h2>
            <p className={`text-sm md:text-base text-center opacity-60 max-w-3xl mx-auto mb-12 md:mb-20 transition-all duration-700 delay-200 px-4
        ${visibleBusinessMentor ? "opacity-60 translate-y-0" : "opacity-0 translate-y-8"}
      `}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              From initial concept to market success, get strategic guidance at every stage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {[
                {
                  title: "Idea Validation",
                  desc: "Feasibility, scalability & profitability analysis",
                  icon: Lightbulb,
                },
                {
                  title: "Market Research",
                  desc: "Target audience, market size & demand",
                  icon: Users,
                },
                {
                  title: "Competitor Analysis",
                  desc: "Existing solutions & market gaps",
                  icon: Search,
                },
                {
                  title: "Revenue Planning",
                  desc: "Business models & monetization",
                  icon: DollarSign,
                },
                {
                  title: "Go-to-Market",
                  desc: "Launch strategy & marketing plan",
                  icon: Rocket,
                },
                {
                  title: "Risk Mitigation",
                  desc: "Identify & minimize potential risks",
                  icon: Shield,
                },
              ].map((item, i) => {
                const [isHovered, setIsHovered] = useState(false);
                const [rotations, setRotations] = useState(0);

                useEffect(() => {
                  if (isHovered) {
                    // First rotation happens immediately
                    setRotations(prev => prev + 1);
                    // Then subsequent rotations happen every 1 second
                    const interval = setInterval(() => {
                      setRotations(prev => prev + 1);
                    }, 1000);
                    return () => clearInterval(interval);
                  }
                }, [isHovered]);

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setRotations(0);
                    }}
                    className={`rounded-2xl p-6 md:p-10 border backdrop-blur-sm transition-all duration-700
                ${isDark
                        ? "border-white/10 bg-white/5 hover:border-white/30"
                        : "border-black/10 bg-black/5 hover:border-black/30"}
                ${visibleBusinessMentor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl border flex items-center justify-center
                  ${isDark ? "border-white/10" : "border-black/10"}
                `}
                    >
                      <div
                        style={{
                          transform: `rotate(${rotations * 360}deg)`,
                          transition: 'transform 0.6s ease-in-out'
                        }}
                      >
                        <item.icon strokeWidth={1.2} size={20} className="md:w-6 md:h-6" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl mb-2 md:mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >{item.title}</h3>
                    <p className="opacity-60 text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------- Hardware Mentor -------- */}
          <div ref={hardwareMentorRef} style={{ transform: `translateY(-${offsetHardwareMentor}px)` }}>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 tracking-tight text-center transition-all duration-700 delay-100 px-4
        ${visibleHardwareMentor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Build Your Prototype Like a Pro
            </h2>
            <p className={`text-sm md:text-base text-center opacity-60 max-w-3xl mx-auto mb-12 md:mb-20 transition-all duration-700 delay-200 px-4
        ${visibleHardwareMentor ? "opacity-60 translate-y-0" : "opacity-0 translate-y-8"}
      `}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Expert guidance for every step of your hardware development journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {[
                {
                  title: "Technical Breakdown",
                  desc: "Convert ideas into hardware functions",
                  icon: Cpu,
                },
                {
                  title: "Component Selection",
                  desc: "Sensors, microcontrollers & materials",
                  icon: Package,
                },
                {
                  title: "Circuit Design",
                  desc: "Architecture & diagrams",
                  icon: Layers,
                },
                {
                  title: "Prototype Planning",
                  desc: "V1 → V2 → final model steps",
                  icon: GitBranch,
                },
                {
                  title: "Cost Estimation",
                  desc: "Low to advanced budget options",
                  icon: Calculator,
                },
                {
                  title: "Manufacturing",
                  desc: "Small to mass production guidance",
                  icon: Factory,
                },
              ].map((item, i) => {
                const [isHovered, setIsHovered] = useState(false);
                const [rotations, setRotations] = useState(0);

                useEffect(() => {
                  if (isHovered) {
                    // First rotation happens immediately
                    setRotations(prev => prev + 1);
                    // Then subsequent rotations happen every 1 second
                    const interval = setInterval(() => {
                      setRotations(prev => prev + 1);
                    }, 1000);
                    return () => clearInterval(interval);
                  }
                }, [isHovered]);

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setRotations(0);
                    }}
                    className={`rounded-2xl p-6 md:p-10 border backdrop-blur-sm transition-all duration-700
                ${isDark
                        ? "border-white/10 bg-white/5 hover:border-white/30"
                        : "border-black/10 bg-black/5 hover:border-black/30"}
                ${visibleHardwareMentor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-xl border flex items-center justify-center
                  ${isDark ? "border-white/10" : "border-black/10"}
                `}
                    >
                      <div
                        style={{
                          transform: `rotate(${rotations * 360}deg)`,
                          transition: 'transform 0.6s ease-in-out'
                        }}
                      >
                        <item.icon strokeWidth={1.2} size={20} className="md:w-6 md:h-6" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl mb-2 md:mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >{item.title}</h3>
                    <p className="opacity-60 text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}