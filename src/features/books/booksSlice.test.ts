import { describe, expect, it } from 'vitest';
import booksReducer, {
  borrowBook,
  clearBorrowWarning,
  fetchBooks,
  initialBooksState,
  returnBook,
  setBorrowWarning,
  BooksState,
} from './booksSlice';
import { Book } from '../../types/book';

const mockBook: Book = {
  id: 'book-1',
  title: 'Cấu trúc dữ liệu và giải thuật',
  author: 'Nguyễn Văn A',
  category: 'CNTT',
  publishedYear: 2021,
  availableCopies: 2,
};

describe('booksSlice reducer', () => {
  it('should return initial state when passed an unknown action', () => {
    const state = booksReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialBooksState);
  });

  it('should handle fetchBooks.pending', () => {
    const previousState: BooksState = {
      ...initialBooksState,
      error: 'Previous error',
    };
    const state = booksReducer(previousState, {
      type: fetchBooks.pending.type,
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchBooks.fulfilled', () => {
    const books = [mockBook];
    const state = booksReducer(initialBooksState, {
      type: fetchBooks.fulfilled.type,
      payload: books,
    });
    expect(state.loading).toBe(false);
    expect(state.books).toEqual(books);
    expect(state.error).toBeNull();
  });

  it('should handle fetchBooks.rejected', () => {
    const errorMessage = 'Không thể kết nối đến máy chủ thư viện.';
    const state = booksReducer(initialBooksState, {
      type: fetchBooks.rejected.type,
      payload: errorMessage,
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle borrowBook by decrementing available copies and appending to borrowedBooks', () => {
    const startingState: BooksState = {
      ...initialBooksState,
      books: [{ ...mockBook }],
    };

    const state = booksReducer(startingState, borrowBook('book-1'));
    expect(state.books[0].availableCopies).toBe(1);
    expect(state.borrowedBooks).toHaveLength(1);
    expect(state.borrowedBooks[0].id).toBe('book-1');
  });

  it('should handle returnBook by incrementing available copies and removing from borrowedBooks', () => {
    const startingState: BooksState = {
      ...initialBooksState,
      books: [{ ...mockBook, availableCopies: 1 }],
      borrowedBooks: [
        {
          id: 'book-1',
          title: mockBook.title,
          author: mockBook.author,
          category: mockBook.category,
          borrowedAt: '2026-10-26T00:00:00.000Z',
        },
      ],
    };

    const state = booksReducer(startingState, returnBook('book-1'));
    expect(state.books[0].availableCopies).toBe(2);
    expect(state.borrowedBooks).toHaveLength(0);
  });

  it('should handle setBorrowWarning and clearBorrowWarning', () => {
    const warningMessage = 'Vượt quá giới hạn';
    const stateWithWarning = booksReducer(
      initialBooksState,
      setBorrowWarning(warningMessage)
    );
    expect(stateWithWarning.borrowWarning).toBe(warningMessage);

    const clearedState = booksReducer(stateWithWarning, clearBorrowWarning());
    expect(clearedState.borrowWarning).toBeNull();
  });
});
