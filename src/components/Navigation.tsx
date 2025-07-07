
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
      <div className="w-full px-3">
        <div className="flex justify-between items-center h-12">
          <div className="flex flex-1 items-center space-x-2 min-w-0">
            {/* Compact logo for mobile */}
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
              R
            </div>
            <h1 className="text-base font-bold text-foreground truncate">Readora</h1>
          </div>
          
          <div className="flex items-center">
            {/* Navigation Tabs - more compact */}
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center justify-center w-10 h-10 p-0 touch-manipulation ${
                      activeTab === tab.id 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                );
              })}
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 ml-1 touch-manipulation text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
