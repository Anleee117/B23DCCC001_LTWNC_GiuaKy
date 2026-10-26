import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { BookItem } from './BookItem';
import { Book } from '../../types/book';

const sampleBook: Book = {
  id: 'book-101',
  title: 'Lập trình TypeScript chuyên sâu',
  author: 'Trần Văn Nam',
  category: 'CNTT',
  publishedYear: 2023,
  availableCopies: 4,
};

describe('BookItem component', () => {
  it('renders all book information correctly', () => {
    const handleBorrow = vi.fn();
    render(<BookItem book={sampleBook} onBorrow={handleBorrow} />);

    expect(screen.getByText('Lập trình TypeScript chuyên sâu')).toBeInTheDocument();
    expect(screen.getByText('Trần Văn Nam')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Năm xuất bản: 2023')).toBeInTheDocument();
    expect(screen.getByText('Số bản còn lại: 4')).toBeInTheDocument();
  });

  it('calls onBorrow with correct book id when Mượn button is clicked', async () => {
    const user = userEvent.setup();
    const handleBorrow = vi.fn();

    render(<BookItem book={sampleBook} onBorrow={handleBorrow} />);

    const borrowButton = screen.getByRole('button', { name: /Mượn/i });
    expect(borrowButton).toBeEnabled();

    await user.click(borrowButton);

    expect(handleBorrow).toHaveBeenCalledTimes(1);
    expect(handleBorrow).toHaveBeenCalledWith('book-101');
  });

  it('disables the Mượn button when available copies are zero', async () => {
    const user = userEvent.setup();
    const handleBorrow = vi.fn();
    const outOfStockBook: Book = {
      ...sampleBook,
      availableCopies: 0,
    };

    render(<BookItem book={outOfStockBook} onBorrow={handleBorrow} />);

    const borrowButton = screen.getByRole('button', { name: /Mượn/i });
    expect(borrowButton).toBeDisabled();

    await user.click(borrowButton);
    expect(handleBorrow).not.toHaveBeenCalled();
  });
});
