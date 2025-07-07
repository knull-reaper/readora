
import { Book, RecentBooksResponse, SearchBooksResponse, BookDetailsResponse } from '@/types/book';

const BASE_URL = 'https://www.dbooks.org/api';

export class BookAPI {
  static async getRecentBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${BASE_URL}/recent`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: RecentBooksResponse = await response.json();
      return data.books || [];
    } catch (error) {
      console.error('Error fetching recent books:', error);
      throw error;
    }
  }

  static async searchBooks(query: string): Promise<Book[]> {
    try {
      if (!query.trim()) return [];
      
      const response = await fetch(`${BASE_URL}/search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SearchBooksResponse = await response.json();
      return data.books || [];
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }

  static async getBookDetails(id: string): Promise<Book> {
    try {
      const response = await fetch(`${BASE_URL}/book/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BookDetailsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  }
}
