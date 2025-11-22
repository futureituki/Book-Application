'use client';

import { Bookshelf } from '@/components/bookshelf';
import { Button } from '@/components/ui/button';
import { Book } from '@/lib/db/schema';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { data: books, error, isLoading } = useSWR<Book[]>('/api/books', fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (error) return <div>Failed to load books</div>;
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading library...</div>;

  return (
    <div className="min-h-screen bg-[#f4e4bc] p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 font-serif">My Library</h1>
          <p className="text-amber-800">
            {books?.length || 0} books in your collection
          </p>
        </div>
        <Link href="/books/add">
          <Button className="bg-amber-800 hover:bg-amber-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </Link>
      </div>

      {/* Bookshelf Area */}
      <div className="relative min-h-[600px] rounded-xl border-8 border-amber-900 bg-[#e6d2aa] p-8 shadow-2xl">
        {/* Wood Texture Overlay (Optional CSS trick) */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        
        <Bookshelf books={books || []} />
      </div>
    </div>
  );
}
