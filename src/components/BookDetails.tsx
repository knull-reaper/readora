
import React from 'react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, Book as BookIcon } from 'lucide-react';
import { StorageManager } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onBack }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (book.download) {
      // Add to downloads list
      StorageManager.addDownload(book);
      
      // Open download link
      window.open(book.download, '_blank');
      
      toast({
        title: "Download Started",
        description: `"${book.title}" has been added to your library.`,
      });
    } else {
      toast({
        title: "Download Unavailable",
        description: "This book doesn't have a download link available.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
      
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Button>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Book Image Section */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative group animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-110" />
              <img
                src={book.image}
                alt={book.title}
                className="relative w-full max-w-sm rounded-2xl shadow-elegant group-hover:shadow-glow transition-all duration-500 transform group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Book Details Section */}
          <div className="lg:col-span-3 space-y-8 animate-fade-in">
            {/* Title and Author */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <h2 className="text-xl lg:text-2xl text-muted-foreground mb-4 font-medium">
                    {book.subtitle}
                  </h2>
                )}
              </div>
              <p className="text-xl text-muted-foreground">
                by <span className="font-semibold text-primary">{book.authors}</span>
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-3">
              {book.year && (
                <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
                  {book.year}
                </Badge>
              )}
              {book.pages && (
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {book.pages} pages
                </Badge>
              )}
              {book.language && (
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {book.language}
                </Badge>
              )}
              {book.filesize && (
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {book.filesize}
                </Badge>
              )}
              {book.category && (
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {book.category}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownload}
                size="lg"
                className="gradient-primary shadow-elegant hover:shadow-glow transition-all duration-300 flex items-center space-x-3 px-8 py-4 text-base font-semibold"
                disabled={!book.download}
              >
                <Download className="w-5 h-5" />
                <span>Download Book</span>
              </Button>
              
              {book.preview && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open(book.preview, '_blank')}
                  className="flex items-center space-x-3 px-8 py-4 text-base border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  <BookIcon className="w-5 h-5" />
                  <span>Preview</span>
                </Button>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <Card className="gradient-card shadow-card border-0 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <h3 className="text-2xl font-bold text-foreground">About this book</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {book.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
