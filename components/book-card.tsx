import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/lib/db/schema';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`} className="group relative block h-full w-full perspective-1000">
      <div className="relative aspect-[2/3] w-full transform-style-3d transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105">
        {/* Book Spine/Thickness effect */}
        <div className="absolute left-0 top-0 h-full w-4 -translate-x-3 translate-z-[-2px] rotate-y-[-90deg] bg-gray-200 brightness-90" />
        
        {/* Main Cover */}
        <div className="absolute inset-0 overflow-hidden rounded-r-sm bg-white shadow-lg transition-shadow group-hover:shadow-xl">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 20vw"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-amber-50 p-4 text-center">
              <span className="font-serif text-sm font-bold text-amber-900 line-clamp-3">
                {book.title}
              </span>
              <span className="mt-2 text-xs text-amber-700 line-clamp-2">
                {book.authors ? JSON.parse(book.authors).join(', ') : 'Unknown'}
              </span>
            </div>
          )}
          
          {/* Status Badge */}
          {book.status === 'reading' && (
            <div className="absolute right-2 top-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Reading
            </div>
          )}
          {book.status === 'completed' && (
            <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Done
            </div>
          )}
        </div>
      </div>
      
      {/* Reflection/Shadow below */}
      <div className="absolute -bottom-4 left-0 h-4 w-full scale-y-[-1] opacity-20 blur-sm">
         {book.coverUrl && (
            <Image
              src={book.coverUrl}
              alt=""
              fill
              className="object-cover mask-image-gradient"
            />
         )}
      </div>
    </Link>
  );
}
