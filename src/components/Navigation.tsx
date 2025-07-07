
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
      <div className="w-full px-2 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Mobile logo - just R */}
            <div className="sm:hidden">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                R
              </div>
            </div>
            
            {/* Desktop logo - full name */}
            <div className="hidden sm:flex items-center space-x-2">
              <Book className="w-6 h-6 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
              <h1 className="text-lg lg:text-2xl font-bold text-foreground whitespace-nowrap">Readora</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Navigation Tabs */}
            <div className="flex space-x-0.5 sm:space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onTabChange(tab.id)}
                    className="flex items-center space-x-1 px-2 sm:px-3 py-2 min-h-[40px] sm:min-h-[44px] touch-manipulation text-xs sm:text-sm"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="hidden md:inline whitespace-nowrap">{tab.label}</span>
                  </Button>
                );
              })}
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 sm:w-11 sm:h-11 p-0 rounded-full hover:bg-primary/10 transition-colors touch-manipulation flex-shrink-0 ml-1"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
