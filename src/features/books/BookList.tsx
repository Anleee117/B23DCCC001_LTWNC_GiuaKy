import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFilterStore } from '../filters/filterStore';
import { borrowBook } from './booksSlice';
import { BookItem } from './BookItem';
import { Book } from '../../types/book';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.books);
  const { keyword, category } = useFilterStore();

  const handleBorrow = useCallback(
    (bookId: string) => {
      dispatch(borrowBook(bookId));
    },
    [dispatch]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book: Book) => {
      const matchesCategory = category === 'Tất cả' || book.category === category;
      const lowerKeyword = keyword.trim().toLowerCase();
      const matchesKeyword =
        lowerKeyword === '' ||
        book.title.toLowerCase().includes(lowerKeyword) ||
        book.author.toLowerCase().includes(lowerKeyword);

      return matchesCategory && matchesKeyword;
    });
  }, [books, category, keyword]);

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-state">
        <p>Không tìm thấy cuốn sách nào phù hợp với yêu cầu tìm kiếm.</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {filteredBooks.map((book: Book) => (
        <BookItem key={book.id} book={book} onBorrow={handleBorrow} />
      ))}
    </div>
  );
};
