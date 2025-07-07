
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StorageManager } from '@/lib/storage';

interface PreferencesPanelProps {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  onThemeChange: (theme: 'light' | 'dark') => void;
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({
  theme,
  fontSize,
  onThemeChange,
  onFontSizeChange,
}) => {
  const clearCache = () => {
    // Clear all cache items
    const keys = Object.keys(localStorage).filter(key => key.startsWith('cache_'));
    keys.forEach(key => localStorage.removeItem(key));
    
    // Show some feedback
    alert('Cache cleared successfully!');
  };

  const clearDownloads = () => {
    if (confirm('Are you sure you want to clear all downloads? This cannot be undone.')) {
      localStorage.removeItem('downloads');
      alert('Downloads cleared successfully!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Preferences</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Theme</Label>
            <div className="flex space-x-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => onThemeChange('light')}
                className="flex-1"
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => onThemeChange('dark')}
                className="flex-1"
              >
                Dark
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Font Size</Label>
            <div className="flex space-x-2">
              <Button
                variant={fontSize === 'small' ? 'default' : 'outline'}
                onClick={() => onFontSizeChange('small')}
                className="flex-1"
              >
                Small
              </Button>
              <Button
                variant={fontSize === 'medium' ? 'default' : 'outline'}
                onClick={() => onFontSizeChange('medium')}
                className="flex-1"
              >
                Medium
              </Button>
              <Button
                variant={fontSize === 'large' ? 'default' : 'outline'}
                onClick={() => onFontSizeChange('large')}
                className="flex-1"
              >
                Large
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base font-medium">Clear Cache</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear cached book data to free up storage space
              </p>
            </div>
            <Button variant="outline" onClick={clearCache}>
              Clear Cache
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base font-medium">Clear Downloads</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remove all downloaded books from your library
              </p>
            </div>
            <Button variant="destructive" onClick={clearDownloads}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesPanel;
