import React, { useCallback } from 'react';
import { AlertCircle, AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearBorrowWarning, fetchBooks, returnBook } from '../features/books/booksSlice';
import { SearchBar } from '../components/SearchBar';
import { BookList } from '../features/books/BookList';
import { BorrowedBooksList } from '../features/books/BorrowedBooksList';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, borrowWarning, borrowedBooks } = useAppSelector(
    (state) => state.books
  );

  const handleReturn = useCallback(
    (bookId: string) => {
      dispatch(returnBook(bookId));
    },
    [dispatch]
  );

  const handleDismissWarning = useCallback(() => {
    dispatch(clearBorrowWarning());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      {borrowWarning && (
        <div className="alert-banner warning">
          <div className="alert-left">
            <AlertTriangle size={20} />
            <span>{borrowWarning}</span>
          </div>
          <button
            type="button"
            className="alert-close-btn"
            onClick={handleDismissWarning}
            aria-label="Đóng thông báo"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="alert-banner error">
          <div className="alert-left">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button type="button" className="btn btn-primary" style={{ width: 'auto', padding: '6px 14px' }} onClick={handleRetry}>
            Thử lại
          </button>
        </div>
      )}

      <BorrowedBooksList borrowedBooks={borrowedBooks} onReturn={handleReturn} />

      <SearchBar />

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Đang tải...</p>
        </div>
      ) : (
        <BookList />
      )}
    </div>
  );
};
