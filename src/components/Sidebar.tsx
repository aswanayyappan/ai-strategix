import { LayoutDashboard, History, FileText, TrendingUp, AlertTriangle, Rocket, Settings, Plus, User, ChevronLeft, ChevronRight, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onBack?: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  user?: UserData;
  onSidebarCollapse?: (isCollapsed: boolean) => void;
}

export function Sidebar({ currentPage, onNavigate, onBack, theme, setTheme, user, onSidebarCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isDark = theme === "dark";

  // Notify parent when sidebar collapse state changes
  useEffect(() => {
    onSidebarCollapse?.(isCollapsed);
  }, [isCollapsed, onSidebarCollapse]);

  const menuItems = [
    { id: 'new', label: 'New Strategy', icon: Plus },
    { id: 'history', label: 'Strategy History', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'market', label: 'Market Analysis', icon: TrendingUp },
    { id: 'risk', label: 'Risk Analysis', icon: AlertTriangle },
    { id: 'product', label: 'Product & Growth', icon: Rocket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentSessions = [
    { id: 1, title: 'SaaS scaling strategy', time: '2h ago' },
    { id: 2, title: 'Market risk analysis', time: '1d ago' },
    { id: 3, title: 'Product roadmap review', time: '3d ago' },
    { id: 4, title: 'Competitor analysis', time: '5d ago' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed top-4 left-4 z-50 md:hidden rounded-full p-3 border backdrop-blur-3xl transition-all min-w-[48px] min-h-[48px] flex items-center justify-center ${isDark
          ? 'bg-white/5 border-white/15 hover:bg-white/10'
          : 'bg-black/5 border-black/15 hover:bg-black/10'
          }`}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen border-r flex flex-col transition-all duration-300 ease-in-out z-40 ${isCollapsed ? 'w-20' : 'w-72'
          } ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        {/* Top Section */}
        <div className={`${isCollapsed ? 'p-2' : 'p-6'} border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          {!isCollapsed && (
            <div className="mb-6">
              <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl text-foreground mb-1">
                AI Business
              </h1>
              <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl text-foreground">
                Strategist
              </h1>
            </div>
          )}
        </div>

        {/* Toggle Button - Hidden on mobile */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute right-0 top-24 translate-x-1/2 bg-sidebar-accent border border-sidebar-border rounded-full p-1 hover:bg-white hover:text-black transition-all"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Primary Menu */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (item.id === 'new' && currentPage === 'console');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id === 'new' ? 'console' : item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
                    ? isDark
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Recent Sessions */}
          {!isCollapsed && (
            <div className="mt-8">
              <h3
                className="text-xs text-muted-foreground px-4 mb-3 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-data)' }}
              >
                Recent Sessions
              </h3>
              <div className="space-y-1">
                {recentSessions.map((session) => (
                  <button
                    key={session.id}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-all group"
                  >
                    <p
                      className="text-sm text-foreground truncate mb-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {session.title}
                    </p>
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: 'var(--font-data)' }}
                    >
                      {session.time}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          {/* Theme Toggle */}
          {!isCollapsed && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`w-full mb-4 rounded-full p-3 border backdrop-blur-3xl transition-all flex items-center justify-center gap-2
                ${isDark
                  ? "bg-white/5 border-white/15 hover:bg-white/10"
                  : "bg-black/5 border-black/15 hover:bg-black/10"}`}
              style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`w-full mb-4 rounded-full p-3 border backdrop-blur-3xl transition-all flex items-center justify-center
                ${isDark
                  ? "bg-white/5 border-white/15 hover:bg-white/10"
                  : "bg-black/5 border-black/15 hover:bg-black/10"}`}
              style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <div
            className={`flex items-center gap-3 ${isCollapsed ? 'p-2' : 'p-3'} rounded-2xl transition-all cursor-pointer ${isCollapsed ? 'justify-center' : ''
              } ${currentPage === 'profile'
                ? isDark
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-black/10 border border-black/20'
                : isDark
                  ? 'hover:bg-white/5 border border-transparent'
                  : 'hover:bg-black/5 border border-transparent'
              }`}>
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-transform text-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'
              } ${currentPage === 'profile' ? 'scale-110' : 'group-hover:scale-105'}`}
              style={{ fontFamily: 'var(--font-heading)', minWidth: '40px', minHeight: '40px', flexShrink: 0 }}
            >
              {user?.avatar || 'JD'}
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1">
                  <p className="text-sm text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    {user?.name || 'John Doe'}
                  </p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-data)' }}>
                    {user?.plan || 'Enterprise Plan'}
                  </p>
                </div>
                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${currentPage === 'profile' ? 'translate-x-1' : ''
                  }`} />
              </>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={onBack}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 border border-red-500 mt-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <LogOut size={18} />
              Log Out
            </button>
          )}
        </div>
      </div>
    </>
  );
}