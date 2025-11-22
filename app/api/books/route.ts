import { db } from '@/lib/db/drizzle';
import { books } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createBookSchema = z.object({
  googleBookId: z.string().optional(),
  title: z.string().min(1),
  authors: z.array(z.string()).optional(),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  isbn: z.string().optional(),
  status: z.enum(['want_to_read', 'reading', 'completed']).default('want_to_read'),
  rating: z.number().min(1).max(5).optional(),
});

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userBooks = await db
    .select()
    .from(books)
    .where(eq(books.userId, user.id))
    .orderBy(desc(books.createdAt));

  return NextResponse.json(userBooks);
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    const body = createBookSchema.parse(json);

    const [newBook] = await db
      .insert(books)
      .values({
        userId: user.id,
        ...body,
        authors: body.authors ? JSON.stringify(body.authors) : null,
      })
      .returning();

    return NextResponse.json(newBook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
