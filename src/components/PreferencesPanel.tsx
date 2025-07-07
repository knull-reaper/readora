
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StorageManager } from '@/lib/storage';

interface PreferencesPanelProps {
  fontSize: 'small' | 'medium' | 'large';
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({
  fontSize,
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
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 -z-10" />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in">Settings</h1>
          
          <div className="space-y-6">
            {/* Font Size Settings */}
            <Card className="gradient-card shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Font Size</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Choose your preferred text size for better readability.</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={fontSize === 'small' ? 'default' : 'outline'}
                    onClick={() => onFontSizeChange('small')}
                    className="text-sm px-6 py-3"
                  >
                    Small
                  </Button>
                  <Button
                    variant={fontSize === 'medium' ? 'default' : 'outline'}
                    onClick={() => onFontSizeChange('medium')}
                    className="text-base px-6 py-3"
                  >
                    Medium
                  </Button>
                  <Button
                    variant={fontSize === 'large' ? 'default' : 'outline'}
                    onClick={() => onFontSizeChange('large')}
                    className="text-lg px-6 py-3"
                  >
                    Large
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="gradient-card shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Label className="text-base font-medium text-foreground">Clear Cache</Label>
                    <p className="text-sm text-muted-foreground">
                      Clear cached book data to free up storage space
                    </p>
                  </div>
                  <Button variant="outline" onClick={clearCache}>
                    Clear Cache
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Label className="text-base font-medium text-foreground">Clear Downloads</Label>
                    <p className="text-sm text-muted-foreground">
                      Remove all downloaded books from your library
                    </p>
                  </div>
                  <Button variant="destructive" onClick={clearDownloads}>
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="gradient-card shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">About Redora</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Redora is your personal digital library for discovering, downloading, and organizing books. 
                  You can now toggle between light and dark mode using the button in the navigation bar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;
