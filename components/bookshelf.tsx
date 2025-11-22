import { Book } from '@/lib/db/schema';
import { BookCard } from './book-card';

interface BookshelfProps {
  books: Book[];
}

export function Bookshelf({ books }: BookshelfProps) {
  if (books.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-200 bg-amber-50/50 p-8 text-center">
        <p className="text-lg font-medium text-amber-900">Your bookshelf is empty</p>
        <p className="text-sm text-amber-700">Add some books to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-3 gap-x-8 gap-y-16 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {books.map((book) => (
          <div key={book.id} className="relative z-10">
            <BookCard book={book} />
            {/* Shelf Platform for each row (visually connected via CSS grid) */}
          </div>
        ))}
      </div>
      
      {/* Background Shelves - This is a visual trick. 
          In a real grid, it's hard to put a continuous shelf behind items.
          Instead, we can style the container or use a background pattern.
          For now, let's try a simple background texture approach on the main container in page.tsx
      */}
    </div>
  );
}
