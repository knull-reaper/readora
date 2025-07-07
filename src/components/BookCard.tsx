
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
      className="group cursor-pointer transition-all duration-500 hover:scale-[1.02] gradient-card shadow-card hover:shadow-elegant border-0 backdrop-blur-sm relative overflow-hidden animate-fade-in"
      onClick={() => onClick(book)}
    >
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      
      <div className="aspect-[3/4] overflow-hidden rounded-t-lg relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        {/* Image overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <CardContent className="p-6 space-y-3 relative z-20">
        <h3 className="font-bold text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-1 font-medium">
            {book.subtitle}
          </p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-1 opacity-75">
          by {book.authors}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {book.year && (
            <Badge variant="secondary" className="text-xs font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              {book.year}
            </Badge>
          )}
          {book.pages && (
            <Badge variant="outline" className="text-xs">
              {book.pages}p
            </Badge>
          )}
        </div>
        
        {showDescription && book.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mt-3 leading-relaxed">
            {book.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
