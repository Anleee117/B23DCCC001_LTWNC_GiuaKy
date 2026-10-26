import React from 'react';
import { BookOpen, User, Calendar, BookmarkPlus } from 'lucide-react';
import { Book } from '../../types/book';

interface BookItemProps {
  book: Book;
  onBorrow: (bookId: string) => void;
}

const categoryClassMap: Record<string, string> = {
  CNTT: 'badge-CNTT',
  'Kinh tế': 'badge-Kinhte',
  'Ngoại ngữ': 'badge-Ngoaingu',
};

const BookItemComponent: React.FC<BookItemProps> = ({ book, onBorrow }) => {
  const isOutOfStock = book.availableCopies <= 0;

  return (
    <div className="book-card" data-testid={`book-card-${book.id}`}>
      <div>
        <span className={`book-badge ${categoryClassMap[book.category] ?? 'badge-CNTT'}`}>
          {book.category}
        </span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-meta">
          <User size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          <span>{book.author}</span>
        </p>
        <p className="book-meta">
          <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          <span>Năm xuất bản: {book.publishedYear}</span>
        </p>
        <p className="book-copies">
          <BookOpen size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          <span className={isOutOfStock ? 'copies-empty' : 'copies-available'}>
            Số bản còn lại: {book.availableCopies}
          </span>
        </p>
      </div>
      <div className="book-card-actions">
        <button
          type="button"
          className="btn btn-primary"
          disabled={isOutOfStock}
          onClick={() => onBorrow(book.id)}
        >
          <BookmarkPlus size={16} />
          <span>Mượn</span>
        </button>
      </div>
    </div>
  );
};

export const BookItem = React.memo(BookItemComponent);
