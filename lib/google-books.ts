export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
  };
}

export interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverUrl: string;
  isbn: string;
}

export async function searchBooks(query: string): Promise<SearchResult[]> {
  if (!query) return [];

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch books from Google Books API');
  }

  const data = await res.json();

  if (!data.items) {
    return [];
  }

  return data.items.map((item: GoogleBook) => {
    const volumeInfo = item.volumeInfo;
    const isbn = volumeInfo.industryIdentifiers?.find(
      (id) => id.type === 'ISBN_13' || id.type === 'ISBN_10'
    )?.identifier;

    return {
      id: item.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors || ['Unknown Author'],
      description: volumeInfo.description || '',
      coverUrl: volumeInfo.imageLinks?.thumbnail
        ?.replace('http:', 'https:')
        .replace('&edge=curl', '')
        .replace('&zoom=1', '&zoom=0') || '',
      isbn: isbn || '',
    };
  });
}
