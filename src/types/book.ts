
export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string;
  image: string;
  url: string;
  download?: string;
  description?: string;
  year?: string;
  pages?: string;
  language?: string;
  filesize?: string;
  category?: string;
  preview?: string;
}

export interface RecentBooksResponse {
  books: Book[];
  status: string;
  total: string;
}

export interface SearchBooksResponse {
  books: Book[];
  status: string;
  total: string;
}

export interface BookDetailsResponse extends Book {
  status: string;
}
