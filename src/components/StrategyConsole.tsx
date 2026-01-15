import { useState, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface UserData {
  name: string;
  email: string;
  company: string;
  role: string;
  joinedDate: string;
  plan: string;
  avatar: string;
  department: string;
  location: string;
  phone: string;
  timezone: string;
  lastActive: string;
}

interface StrategyConsoleProps {
  user: UserData;
  onGenerateStrategy: (prompt: string) => void;
  hasOutput: boolean;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  children?: React.ReactNode;
}

export function StrategyConsole({ user, onGenerateStrategy, hasOutput, onBack, onNavigate, theme, setTheme, children }: StrategyConsoleProps) {
  const [currentPage, setCurrentPage] = useState('console');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const placeholders = [
    "Analyze my startup's growth risks and opportunities",
    "Create a scaling plan for my B2B SaaS product",
    "Analyze market trends and stock outlook for fintech sector",
    "Evaluate competitive landscape for e-commerce platform",
    "Generate 90-day product roadmap with key milestones"
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setIsGenerating(true);
      setTimeout(() => {
        onGenerateStrategy(prompt);
        setIsGenerating(false);
      }, 1500);
    }
  };

  return (
    <div className={`relative flex min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
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

      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate || setCurrentPage}
        onBack={onBack}
        theme={theme}
        setTheme={setTheme}
        user={user}
        onSidebarCollapse={setSidebarCollapsed}
      />

      <div className={`relative z-10 flex-1 flex flex-col h-[100dvh] transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-72'}`}>
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className={`w-full ${hasOutput ? 'pb-32 pt-4 md:py-8 px-4 md:px-16' : 'min-h-full flex items-center justify-center'}`}>
            {!hasOutput ? (
              <div className="max-w-4xl px-4 md:px-8 w-full pt-20 md:pt-0">
                {/* Header - Only show when no output */}
                <div className="text-center mb-8 md:mb-12 animate-fade-in">
                  <h1
                    className="text-3xl md:text-5xl text-foreground mb-3 md:mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    What strategic challenge
                  </h1>
                  <h1
                    className="text-3xl md:text-5xl text-foreground mb-4 md:mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    should we analyze today?
                  </h1>
                  <p
                    className="text-base md:text-lg text-muted-foreground px-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Enter your prompt and receive comprehensive executive-level analysis
                  </p>
                </div>

                {/* Loading State in Chat Area */}
                {isGenerating && (
                  <div className="mt-8 text-center animate-fade-in">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-3 md:py-4">
                      <div className="animate-spin">
                        <Sparkles size={18} className="text-white" />
                      </div>
                      <p
                        className="text-white text-sm md:text-base"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Analyzing strategic data and generating insights...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* AI Output content will be rendered here when hasOutput is true */}
                {children}

                {/* Loading State when continuing conversation */}
                {isGenerating && (
                  <div className="mt-8 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-3 md:py-4">
                      <div className="animate-spin">
                        <Sparkles size={18} className="text-white" />
                      </div>
                      <p
                        className="text-white text-sm md:text-base"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Analyzing strategic data and generating insights...
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Fixed Prompt Input Area at Bottom */}
        <div className={`border-t backdrop-blur-sm ${isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10'} safe-area-padding-bottom`}>
          <div className={`w-full ${hasOutput ? 'py-4 md:py-6 px-4 md:px-16' : 'py-6 md:py-8 px-4 md:px-8'} max-w-5xl mx-auto`}>
            {/* Prompt Input */}
            <form onSubmit={handleSubmit} className="animate-fade-in-up" style={{ animationDelay: hasOutput ? '0ms' : '200ms' }}>
              {/* Quick Suggestions - Only show when no output */}
              {!hasOutput && (
                <div className="mb-4 md:mb-6 flex flex-wrap gap-2 md:gap-3 justify-center">
                  {['Market Analysis', 'Risk Assessment', 'Growth Strategy', 'Competitive Intel'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setPrompt(`Generate ${suggestion.toLowerCase()} for my business`)}
                      className="bg-secondary hover:bg-muted text-foreground px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all text-xs md:text-sm border border-white/10 min-h-[40px]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={placeholders[currentPlaceholder]}
                  onFocus={() => {
                    // Rotate placeholder on focus
                    setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
                  }}
                  className={`w-full bg-input-background border-2 border-input focus:border-white text-foreground px-4 md:px-8 py-3 md:py-4 pr-16 md:pr-24 rounded-3xl focus:outline-none transition-all resize-none min-h-[56px] ${hasOutput ? 'text-sm md:text-base' : 'text-base md:text-lg'
                    }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                  rows={hasOutput ? 1 : 2}
                  disabled={isGenerating}
                />
                <button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  className={`absolute left-auto right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all border disabled:bg-muted disabled:cursor-default flex items-center justify-center min-w-[44px] min-h-[44px] ${isDark
                    ? 'bg-white hover:bg-black hover:text-white text-black border-white'
                    : 'bg-black hover:bg-white hover:text-black text-white border-black'
                    }`}
                  style={{ left: 'auto', right: '1rem' }}
                >
                  {isGenerating ? (
                    <div className="animate-spin">
                      <Send size={18} />
                    </div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}