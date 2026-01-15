import { User, Mail, Building, Calendar, LogOut, Sun, Moon, MapPin, Phone, Globe, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
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

interface ProfilePageProps {
  user: UserData;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export function ProfilePage({ user, onBack, onLogout, onNavigate, theme, setTheme }: ProfilePageProps) {
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

      <Sidebar currentPage="profile" onNavigate={onNavigate} onBack={onBack} theme={theme} setTheme={setTheme} user={user} onSidebarCollapse={setSidebarCollapsed} />

      <div className={`relative z-10 px-4 md:px-16 py-6 md:py-12 pt-20 md:pt-12 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-72'
        }`}>
        <div className="max-w-4xl">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h1
              className="text-3xl md:text-4xl text-foreground mb-2 md:mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Profile Settings
            </h1>
            <p
              className="text-sm md:text-base text-muted-foreground"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-6 md:mb-8 animate-fade-in-up">
            {/* Profile Avatar */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {user.avatar}
              </div>
              <div className="text-center md:text-left">
                <h2
                  className="text-xl md:text-2xl text-foreground mb-1 md:mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {user.name}
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {user.role}
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    FULL NAME
                  </label>
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.name}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    COMPANY
                  </label>
                  <div className="flex items-center gap-3">
                    <Building size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.company}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    DEPARTMENT
                  </label>
                  <div className="flex items-center gap-3">
                    <Building size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.department}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    LOCATION
                  </label>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.location}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    PHONE
                  </label>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    TIMEZONE
                  </label>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.timezone}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    MEMBER SINCE
                  </label>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.joinedDate}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-data)' }}
                  >
                    LAST ACTIVE
                  </label>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-muted-foreground" />
                    <p
                      className="text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {user.lastActive}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3
              className="text-xl md:text-2xl text-foreground mb-4 md:mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Subscription Plan
            </h3>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p
                  className="text-2xl text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {user.plan}
                </p>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Full access to AI Business Strategist
                </p>
              </div>
              <button
                className={`w-full md:w-auto px-6 py-3 rounded-full transition-all border min-h-[44px] ${isDark
                  ? 'bg-white/5 hover:bg-white/10 text-foreground border-white/10'
                  : 'bg-black/5 hover:bg-black/10 text-foreground border-black/10'
                  }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Manage Plan
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 md:space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <button
              className={`w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 border min-h-[52px] ${isDark
                ? 'bg-white/5 hover:bg-white/10 text-foreground border-white/10'
                : 'bg-black/5 hover:bg-black/10 text-foreground border-black/10'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <User size={18} />
              Edit Profile
            </button>

            <button
              onClick={onLogout}
              className={`w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 border min-h-[52px] ${isDark
                ? 'bg-white/5 hover:bg-red-500/20 text-foreground hover:text-red-500 border-white/10 hover:border-red-500/50'
                : 'bg-black/5 hover:bg-red-500/20 text-foreground hover:text-red-500 border-black/10 hover:border-red-500/50'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}