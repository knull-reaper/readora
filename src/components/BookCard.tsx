
import React from 'react';
import { Book } from '@/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
  showDescription?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick, showDescription = false }) => {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      onClick={() => onClick(book)}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {book.subtitle}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
          {book.authors}
        </p>
        {book.year && (
          <Badge variant="secondary" className="text-xs">
            {book.year}
          </Badge>
        )}
        {showDescription && book.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mt-2">
            {book.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
