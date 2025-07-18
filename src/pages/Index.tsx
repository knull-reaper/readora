
import React, { useState, useEffect, useCallback } from 'react';
import { Book } from '@/types/book';
import { BookAPI } from '@/lib/api';
import { StorageManager } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import BookDetails from '@/components/BookDetails';
import PreferencesPanel from '@/components/PreferencesPanel';
import { useToast } from '@/hooks/use-toast';

type ActiveView = 'home' | 'search' | 'downloads' | 'preferences' | 'book-details';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [downloads, setDownloads] = useState<(Book & { downloadedAt: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const { toast } = useToast();

  // Initialize preferences
  useEffect(() => {
    const savedTheme = StorageManager.getTheme();
    const savedFontSize = StorageManager.getFontSize();
    
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    
    StorageManager.setTheme(savedTheme);
    StorageManager.setFontSize(savedFontSize);
  }, []);

  // Load recent books on mount
  useEffect(() => {
    loadRecentBooks();
    loadDownloads();
  }, []);

  const loadRecentBooks = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const cached = StorageManager.getCacheItem<Book[]>('recent_books');
      if (cached) {
        setRecentBooks(cached);
        setLoading(false);
        return;
      }

      const books = await BookAPI.getRecentBooks();
      setRecentBooks(books);
      StorageManager.setCacheItem('recent_books', books, 1800000); // 30 minutes cache
    } catch (error) {
      console.error('Failed to load recent books:', error);
      toast({
        title: "Error",
        description: "Failed to load recent books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDownloads = () => {
    const downloadedBooks = StorageManager.getDownloads();
    setDownloads(downloadedBooks);
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      
      // Check cache first
      const cacheKey = `search_${query.toLowerCase()}`;
      const cached = StorageManager.getCacheItem<Book[]>(cacheKey);
      if (cached) {
        setSearchResults(cached);
        setSearchLoading(false);
        return;
      }

      const books = await BookAPI.searchBooks(query);
      setSearchResults(books);
      StorageManager.setCacheItem(cacheKey, books, 900000); // 15 minutes cache
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  }, [toast]);

  const handleBookClick = async (book: Book) => {
    try {
      // For basic book info, we can show details immediately
      // For full details, we might want to fetch more info
      const cacheKey = `book_${book.id}`;
      const cached = StorageManager.getCacheItem<Book>(cacheKey);
      
      if (cached) {
        setSelectedBook(cached);
      } else {
        try {
          const detailedBook = await BookAPI.getBookDetails(book.id);
          setSelectedBook(detailedBook);
          StorageManager.setCacheItem(cacheKey, detailedBook, 3600000); // 1 hour cache
        } catch (error) {
          // If detailed fetch fails, use the basic book info
          setSelectedBook(book);
        }
      }
      
      setActiveView('book-details');
    } catch (error) {
      console.error('Failed to load book details:', error);
      setSelectedBook(book); // Fallback to basic info
      setActiveView('book-details');
    }
  };

  const handleTabChange = (tab: 'home' | 'search' | 'downloads' | 'preferences') => {
    setActiveView(tab);
    if (tab === 'downloads') {
      loadDownloads(); // Refresh downloads when tab is opened
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    StorageManager.setTheme(newTheme);
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large') => {
    setFontSize(newSize);
    StorageManager.setFontSize(newSize);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 -z-10" />
            
            <div className="p-3">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4 animate-fade-in">
                  <h2 className="text-xl font-bold text-foreground">
                    Recently Added Books
                  </h2>
                  <div className="text-xs text-muted-foreground bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30">
                    {recentBooks.length} books
                  </div>
                </div>
                <BookGrid
                  books={recentBooks}
                  onBookClick={handleBookClick}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 -z-10" />
            
            <div className="p-3">
              <div className="w-full">
                {/* Search Header */}
                <div className="text-center py-6 animate-fade-in">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Search Library
                  </h1>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find your next great read
                  </p>
                  
                  <div className="w-full">
                    <SearchBar
                      onSearch={handleSearch}
                      loading={searchLoading}
                      placeholder="Search books, authors..."
                    />
                  </div>
                </div>

                {/* Results */}
                {searchResults.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground mb-3">
                      Search Results ({searchResults.length})
                    </h2>
                  </div>
                )}

                <BookGrid
                  books={searchResults}
                  onBookClick={handleBookClick}
                  loading={searchLoading}
                  showDescription={true}
                />
              </div>
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 -z-10" />
            
            <div className="p-3">
              <div className="w-full">
                <div className="text-center py-6 animate-fade-in">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Your Library
                  </h1>
                  <p className="text-sm text-muted-foreground mb-4">
                    {downloads.length} books in your collection
                  </p>
                </div>
                <BookGrid
                  books={downloads}
                  onBookClick={handleBookClick}
                />
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <PreferencesPanel
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
        );

      case 'book-details':
        return selectedBook ? (
          <BookDetails
            book={selectedBook}
            onBack={() => setActiveView('home')}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden transition-all duration-500">
      <Navigation
        activeTab={activeView === 'book-details' ? 'home' : activeView as any}
        onTabChange={handleTabChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
