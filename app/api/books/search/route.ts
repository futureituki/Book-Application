import { searchBooks } from '@/lib/google-books';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const books = await searchBooks(query);
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    return NextResponse.json({ error: 'Failed to search books' }, { status: 500 });
  }
}
