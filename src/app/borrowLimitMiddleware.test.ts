import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import booksReducer, {
  borrowBook,
  fetchBooks,
} from '../features/books/booksSlice';
import { borrowLimitMiddleware } from './borrowLimitMiddleware';
import { Book } from '../types/book';

const sampleBooks: Book[] = [
  { id: 'b1', title: 'Sách 1', author: 'A1', category: 'CNTT', publishedYear: 2020, availableCopies: 5 },
  { id: 'b2', title: 'Sách 2', author: 'A2', category: 'CNTT', publishedYear: 2021, availableCopies: 5 },
  { id: 'b3', title: 'Sách 3', author: 'A3', category: 'CNTT', publishedYear: 2022, availableCopies: 5 },
  { id: 'b4', title: 'Sách 4', author: 'A4', category: 'CNTT', publishedYear: 2023, availableCopies: 5 },
];

describe('borrowLimitMiddleware', () => {
  it('allows borrowing up to 3 books and prevents borrowing the fourth book', () => {
    const store = configureStore({
      reducer: { books: booksReducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(borrowLimitMiddleware),
    });

    store.dispatch({
      type: fetchBooks.fulfilled.type,
      payload: sampleBooks,
    });

    store.dispatch(borrowBook('b1'));
    store.dispatch(borrowBook('b2'));
    store.dispatch(borrowBook('b3'));

    let state = store.getState();
    expect(state.books.borrowedBooks).toHaveLength(3);
    expect(state.books.borrowWarning).toBeNull();

    store.dispatch(borrowBook('b4'));

    state = store.getState();
    expect(state.books.borrowedBooks).toHaveLength(3);
    expect(state.books.books.find((b) => b.id === 'b4')?.availableCopies).toBe(5);
    expect(state.books.borrowWarning).toBe(
      'Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc. Vui lòng trả bớt sách để mượn tiếp.'
    );
  });
});
