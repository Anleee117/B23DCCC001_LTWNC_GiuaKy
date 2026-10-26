import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooksApi } from '../../api/booksApi';
import { Book, BorrowedBook, isApiSuccess } from '../../types/book';

export interface BooksState {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  loading: boolean;
  error: string | null;
  borrowWarning: string | null;
}

export const initialBooksState: BooksState = {
  books: [],
  borrowedBooks: [],
  loading: false,
  error: null,
  borrowWarning: null,
};

export const fetchBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (shouldFail = false, { rejectWithValue }) => {
    const response = await fetchBooksApi(shouldFail);
    if (isApiSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState: initialBooksState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const targetBook = state.books.find((b) => b.id === bookId);
      if (targetBook && targetBook.availableCopies > 0) {
        targetBook.availableCopies -= 1;
        state.borrowedBooks.push({
          id: targetBook.id,
          title: targetBook.title,
          author: targetBook.author,
          category: targetBook.category,
          borrowedAt: new Date().toISOString(),
        });
        state.borrowWarning = null;
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const borrowedIndex = state.borrowedBooks.findIndex((b) => b.id === bookId);
      if (borrowedIndex !== -1) {
        state.borrowedBooks.splice(borrowedIndex, 1);
        const targetBook = state.books.find((b) => b.id === bookId);
        if (targetBook) {
          targetBook.availableCopies += 1;
        }
        state.borrowWarning = null;
      }
    },
    setBorrowWarning: (state, action: PayloadAction<string | null>) => {
      state.borrowWarning = action.payload;
    },
    clearBorrowWarning: (state) => {
      state.borrowWarning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Đã có lỗi xảy ra khi tải sách.';
      });
  },
});

export const { borrowBook, returnBook, setBorrowWarning, clearBorrowWarning } = booksSlice.actions;

export default booksSlice.reducer;
