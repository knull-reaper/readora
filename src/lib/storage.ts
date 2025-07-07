
import { Book } from '@/types/book';

export class StorageManager {
  // Cache management
  static setCacheItem(key: string, data: any, ttl: number = 3600000): void {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  }

  static getCacheItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();

      if (now - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  // Downloads management
  static addDownload(book: Book): void {
    const downloads = this.getDownloads();
    const existingIndex = downloads.findIndex(b => b.id === book.id);
    
    if (existingIndex === -1) {
      downloads.push({ ...book, downloadedAt: new Date().toISOString() });
      localStorage.setItem('downloads', JSON.stringify(downloads));
    }
  }

  static getDownloads(): (Book & { downloadedAt: string })[] {
    try {
      const downloads = localStorage.getItem('downloads');
      return downloads ? JSON.parse(downloads) : [];
    } catch (error) {
      console.error('Error reading downloads:', error);
      return [];
    }
  }

  static removeDownload(bookId: string): void {
    const downloads = this.getDownloads();
    const filtered = downloads.filter(b => b.id !== bookId);
    localStorage.setItem('downloads', JSON.stringify(filtered));
  }

  // Preferences management
  static getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  }

  static setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  static getFontSize(): 'small' | 'medium' | 'large' {
    return (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'medium';
  }

  static setFontSize(size: 'small' | 'medium' | 'large'): void {
    localStorage.setItem('fontSize', size);
    document.documentElement.setAttribute('data-font-size', size);
  }
}
