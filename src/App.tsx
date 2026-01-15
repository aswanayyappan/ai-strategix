import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { StrategyConsole } from './components/StrategyConsole';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { AuthPage } from './components/AuthPage';
import { AIOutput } from './components/AIOutput';
import { useTheme } from 'next-themes';

// Mock logged-in user data
const mockUser = {
  name: "Sarah Martinez",
  email: "sarah.martinez@techventures.com",
  company: "TechVentures Inc.",
  role: "Chief Executive Officer",
  joinedDate: "September 2024",
  plan: "Enterprise",
  avatar: "SM",
  department: "Executive Leadership",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  timezone: "Pacific Time (PT)",
  lastActive: "2 hours ago",
};

function App() {
  const [currentState, setCurrentState] = useState<'landing' | 'login' | 'signup' | 'console' | 'profile' | 'output' | 'demo' | 'auth'>('landing'); // Revert to landing
  const { setTheme, resolvedTheme } = useTheme();
  const [userPrompt, setUserPrompt] = useState('');

  // Cast resolvedTheme to "dark" | "light" safely, default to dark if undefined
  const currentTheme = (resolvedTheme === 'light' ? 'light' : 'dark') as "dark" | "light";

  const handleGetStarted = () => {
    setCurrentState('auth');
  };

  const handleAuth = () => {
    setCurrentState('console');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  const handleGenerateStrategy = (prompt: string) => {
    setUserPrompt(prompt);
    setCurrentState('output');
  };

  const handleGoToLogin = () => {
    setCurrentState('login');
  };

  const handleGoToSignUp = () => {
    setCurrentState('auth');
  };

  const handleGoToProfile = () => {
    setCurrentState('profile');
  };

  const handleLogout = () => {
    setCurrentState('landing');
  };

  const handleNavigate = (page: string) => {
    if (page === 'console' || page === 'new') {
      setCurrentState('console');
    } else if (page === 'profile') {
      setCurrentState('profile');
    }
    // Add more navigation handling as needed
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentState === 'landing' && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onSignUp={handleGoToSignUp}
          onProfile={handleGoToProfile}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        />
      )}

      {currentState === 'auth' && (
        <AuthPage
          onAuth={handleAuth}
          onBack={handleBackToLanding}
          onLogin={handleGoToLogin}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        />
      )}

      {currentState === 'login' && (
        <LoginPage
          onAuth={handleAuth}
          onBack={handleBackToLanding}
          onSignUp={handleGoToSignUp}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        />
      )}

      {currentState === 'profile' && (
        <ProfilePage
          user={mockUser}
          onBack={handleBackToLanding}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        />
      )}

      {currentState === 'console' && (
        <StrategyConsole
          user={mockUser}
          onGenerateStrategy={handleGenerateStrategy}
          hasOutput={false}
          onBack={handleBackToLanding}
          onNavigate={handleNavigate}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        />
      )}

      {currentState === 'output' && (
        <StrategyConsole
          user={mockUser}
          onGenerateStrategy={handleGenerateStrategy}
          hasOutput={true}
          onBack={handleBackToLanding}
          onNavigate={handleNavigate}
          theme={currentTheme}
          setTheme={(t) => setTheme(t)}
        >
          <AIOutput prompt={userPrompt} theme={currentTheme} />
        </StrategyConsole>
      )}

    </div>
  );
}

export default App;