
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
    <div className="max-w-4xl mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {book.subtitle}
              </h2>
            )}
            <p className="text-lg text-gray-700 dark:text-gray-300">
              by {book.authors}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.year && <Badge variant="secondary">{book.year}</Badge>}
            {book.pages && <Badge variant="secondary">{book.pages} pages</Badge>}
            {book.language && <Badge variant="secondary">{book.language}</Badge>}
            {book.filesize && <Badge variant="secondary">{book.filesize}</Badge>}
            {book.category && <Badge variant="outline">{book.category}</Badge>}
          </div>

          {book.description && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Description</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {book.description}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex space-x-4">
            <Button 
              onClick={handleDownload}
              size="lg"
              className="flex items-center space-x-2"
              disabled={!book.download}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </Button>
            
            {book.preview && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open(book.preview, '_blank')}
                className="flex items-center space-x-2"
              >
                <BookIcon className="w-5 h-5" />
                <span>Preview</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
