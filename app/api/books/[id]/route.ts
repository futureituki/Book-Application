import { db } from '@/lib/db/drizzle';
import { books } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateBookSchema = z.object({
  status: z.enum(['want_to_read', 'reading', 'completed']).optional(),
  rating: z.number().min(1).max(5).optional(),
  readAt: z.string().optional(), // ISO date string
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) {
    return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
  }

  const [book] = await db
    .select()
    .from(books)
    .where(and(eq(books.id, bookId), eq(books.userId, user.id)));

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) {
    return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
  }

  try {
    const json = await request.json();
    const body = updateBookSchema.parse(json);

    const [updatedBook] = await db
      .update(books)
      .set({
        ...body,
        readAt: body.readAt ? new Date(body.readAt) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(books.id, bookId), eq(books.userId, user.id)))
      .returning();

    if (!updatedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) {
    return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
  }

  try {
    const [deletedBook] = await db
      .delete(books)
      .where(and(eq(books.id, bookId), eq(books.userId, user.id)))
      .returning();

    if (!deletedBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
