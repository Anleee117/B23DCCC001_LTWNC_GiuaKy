import { Middleware } from '@reduxjs/toolkit';
import { BooksState, borrowBook, setBorrowWarning } from '../features/books/booksSlice';

export const borrowLimitMiddleware: Middleware<{}, { books: BooksState }> =
  (storeApi) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const state = storeApi.getState();
      if (state.books.borrowedBooks.length >= 3) {
        storeApi.dispatch(
          setBorrowWarning('Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc. Vui lòng trả bớt sách để mượn tiếp.')
        );
        return;
      }
    }
    return next(action);
  };
