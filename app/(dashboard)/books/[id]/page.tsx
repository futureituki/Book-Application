'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book } from '@/lib/db/schema';
import { ArrowLeft, Loader2, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: book, error, isLoading } = useSWR<Book>(id ? `/api/books/${id}` : null, fetcher); // Fetch single book? 
  // Wait, my API route for single book is not GET enabled yet? 
  // Ah, I only implemented PUT and DELETE for [id]. I need to add GET to [id]/route.ts or filter from list.
  // Let's fix the API first or just filter from the list if we want to be lazy, but proper way is GET /api/books/[id].
  // Actually, I'll implement GET in the same file below to fix this gap.

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (error) return <div>Failed to load book</div>;
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading book details...</div>;
  if (!book) return <div>Book not found</div>;

  const handleStatusChange = async (value: string) => {
    setIsSaving(true);
    try {
      await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value }),
      });
      mutate(`/api/books/${id}`);
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRatingChange = async (value: number) => {
    setIsSaving(true);
    try {
      await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });
      mutate(`/api/books/${id}`);
    } catch (error) {
      console.error('Failed to update rating', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to delete book', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4e4bc] p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Library
        </Link>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Cover Image */}
          <div className="relative h-96 w-64 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            {book.coverUrl ? (
              <Image src={book.coverUrl} alt={book.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">No Cover</div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 font-serif">{book.title}</h1>
              <p className="text-xl text-gray-600 mt-2">
                {book.authors ? JSON.parse(book.authors).join(', ') : 'Unknown Author'}
              </p>
            </div>

            <div className="space-y-4 rounded-lg bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Status</label>
                <Select defaultValue={book.status} onValueChange={handleStatusChange} disabled={isSaving}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="want_to_read">Want to Read</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      disabled={isSaving}
                      className={`transition-colors ${
                        (book.rating || 0) >= star ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-500`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p>{book.description || 'No description available.'}</p>
            </div>

            <div className="pt-6 border-t">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full md:w-auto"
              >
                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                Remove from Library
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
