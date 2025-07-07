
import React from 'react';
import { Book } from '@/types/book';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  loading?: boolean;
  showDescription?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  onBookClick, 
  loading = false, 
  showDescription = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {[...Array(14)].map((_, i) => (
           <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] gradient-card rounded-lg mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 animate-glow"></div>
            </div>
            <div className="space-y-1.5 p-1">
              <div className="h-3 gradient-card rounded-md w-3/4"></div>
              <div className="h-2.5 gradient-card rounded w-1/2"></div>
              <div className="h-2.5 gradient-card rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="gradient-card rounded-full p-6 mb-4 shadow-card">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
        <p className="text-muted-foreground text-center max-w-sm text-sm">
          Try adjusting your search terms or explore our collections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 auto-rows-fr">
      {books.map((book, index) => (
        <div 
          key={book.id} 
          className="animate-slide-up"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <BookCard
            book={book}
            onClick={onBookClick}
            showDescription={showDescription}
          />
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
