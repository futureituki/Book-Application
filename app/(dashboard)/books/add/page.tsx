'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchResult } from '@/lib/google-books';
import { ArrowLeft, Loader2, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddBookPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log(data)
      setResults(data);
    } catch (error) {
      console.error('Failed to search books', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddBook = async (book: SearchResult) => {
    setIsAdding(book.id);
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleBookId: book.id,
          title: book.title,
          authors: book.authors,
          description: book.description,
          coverUrl: book.coverUrl,
          isbn: book.isbn,
          status: 'want_to_read',
        }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to add book', error);
      setIsAdding(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add a New Book</h1>
          <p className="text-gray-600">Search for a book to add to your collection.</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isSearching}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="ml-2">Search</span>
          </Button>
        </form>

        <div className="space-y-4">
          {results.map((book) => (
            <div key={book.id} className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {book.coverUrl ? (
                  <Image src={book.coverUrl} alt={book.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">No Cover</div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.authors.join(', ')}</p>
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">{book.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleAddBook(book)}
                    disabled={isAdding === book.id}
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    {isAdding === book.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    Add to Library
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {results.length === 0 && query && !isSearching && (
            <div className="text-center text-gray-500">No books found. Try a different search term.</div>
          )}
        </div>
      </div>
    </div>
  );
}
