export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export type CategoryFilter = 'Tất cả' | BookCategory;

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishedYear: number;
  availableCopies: number;
}

export type BorrowedBook = Pick<Book, 'id' | 'title' | 'author' | 'category'> & {
  borrowedAt: string;
};

export type CategoryStats = Record<BookCategory, number>;

export type BookPreview = Readonly<Book>;

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isApiSuccess<T>(response: ApiResponse<T>): response is { ok: true; data: T } {
  return response.ok === true;
}

export function isApiError<T>(response: ApiResponse<T>): response is { ok: false; error: string } {
  return response.ok === false;
}
