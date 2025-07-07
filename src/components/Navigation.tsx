
import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Search, Download, Settings, Moon, Sun } from 'lucide-react';
import { StorageManager } from '@/lib/storage';

interface NavigationProps {
  activeTab: 'home' | 'search' | 'downloads' | 'preferences';
  onTabChange: (tab: 'home' | 'search' | 'downloads' | 'preferences') => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, theme, onThemeChange }) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Book },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'downloads' as const, label: 'Library', icon: Download },
    { id: 'preferences' as const, label: 'Settings', icon: Settings },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
  };

  return (
    <nav className="gradient-card backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Redora</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 rounded-full hover:bg-primary/10 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Navigation Tabs */}
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onTabChange(tab.id)}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
