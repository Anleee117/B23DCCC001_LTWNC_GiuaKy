import React from 'react';
import { BookmarkCheck, RotateCcw } from 'lucide-react';
import { BorrowedBook } from '../../types/book';

interface BorrowedBooksListProps {
  borrowedBooks: BorrowedBook[];
  onReturn: (bookId: string) => void;
}

export const BorrowedBooksList: React.FC<BorrowedBooksListProps> = ({
  borrowedBooks,
  onReturn,
}) => {
  if (borrowedBooks.length === 0) {
    return null;
  }

  return (
    <div className="borrowed-section">
      <div className="section-header">
        <h2 className="section-title">
          <BookmarkCheck size={20} color="var(--accent-color)" />
          <span>Sách đang mượn ({borrowedBooks.length}/3)</span>
        </h2>
      </div>
      <div className="borrowed-list">
        {borrowedBooks.map((book) => (
          <div key={book.id} className="borrowed-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="borrowed-thumb"
                />
              )}
              <div className="borrowed-info">
                <h4>{book.title}</h4>
                <p>
                  Tác giả: {book.author} | Thể loại: {book.category}
                </p>
              </div>
            </div>
            <div className="borrowed-btn-wrapper">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onReturn(book.id)}
              >
                <RotateCcw size={16} />
                <span>Trả</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
