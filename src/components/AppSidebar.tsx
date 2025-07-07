import React from 'react';
import { Book, Search, Download, Settings, Moon, Sun } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeTab: 'home' | 'search' | 'downloads' | 'preferences';
  onTabChange: (tab: 'home' | 'search' | 'downloads' | 'preferences') => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function AppSidebar({ activeTab, onTabChange, theme, onThemeChange }: AppSidebarProps) {
  const menuItems = [
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
    <Sidebar className="w-64 border-r border-border/50">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            R
          </div>
          <h2 className="text-lg font-bold text-foreground">Readora</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.id)}
                      isActive={activeTab === item.id}
                      className="w-full justify-start gap-3 text-base py-3 px-4"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <SidebarMenuButton
          onClick={toggleTheme}
          className="w-full justify-start gap-3 text-base py-3 px-4"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-5 h-5" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="w-5 h-5" />
              <span>Light Mode</span>
            </>
          )}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}