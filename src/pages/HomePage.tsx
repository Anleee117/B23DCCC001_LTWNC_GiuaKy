import React, { useCallback, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
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

  useEffect(() => {
    if (borrowWarning) {
      const timer = setTimeout(() => {
        dispatch(clearBorrowWarning());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [borrowWarning, dispatch]);

  const handleReturn = useCallback(
    (bookId: string) => {
      dispatch(returnBook(bookId));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      {borrowWarning && (
        <div className="alert-banner warning">
          {borrowWarning.includes('. ') ? (
            borrowWarning.split('. ').map((part, index, array) => (
              <div key={part}>
                {part}{index < array.length - 1 ? '.' : ''}
              </div>
            ))
          ) : (
            <div>{borrowWarning}</div>
          )}
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
