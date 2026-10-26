import React, { useMemo } from 'react';
import { Layers, BookmarkCheck, BookCopy, FolderKanban } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { Book, BookCategory, CategoryStats } from '../types/book';

const StatsPage: React.FC = () => {
  const { books, borrowedBooks } = useAppSelector((state) => state.books);

  const categoryStats = useMemo(() => {
    const stats: CategoryStats = {
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };

    books.forEach((book: Book) => {
      stats[book.category] = (stats[book.category] ?? 0) + 1;
    });

    return stats;
  }, [books]);

  const categories: BookCategory[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ'];

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">
          <Layers size={22} color="var(--accent-color)" />
          <span>Thống kê thư viện</span>
        </h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Đang mượn</span>
            <BookmarkCheck size={20} color="var(--accent-color)" />
          </div>
          <div className="stat-number">{borrowedBooks.length}</div>
          <div className="stat-subtext">Giới hạn tối đa 3 cuốn</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Tổng số đầu sách</span>
            <BookCopy size={20} color="var(--accent-color)" />
          </div>
          <div className="stat-number">{books.length}</div>
          <div className="stat-subtext">Bao gồm tất cả thể loại</div>
        </div>
      </div>

      <div className="section-header" style={{ marginTop: 20 }}>
        <h3 className="section-title" style={{ fontSize: '1.1rem' }}>
          <FolderKanban size={18} color="var(--accent-color)" />
          <span>Số đầu sách theo từng thể loại</span>
        </h3>
      </div>

      <div className="stats-grid">
        {categories.map((cat) => (
          <div key={cat} className="stat-card">
            <div className="stat-header">
              <span>{cat}</span>
              <span className={`book-badge badge-${cat === 'CNTT' ? 'CNTT' : cat === 'Kinh tế' ? 'Kinhte' : 'Ngoaingu'}`}>
                {cat}
              </span>
            </div>
            <div className="stat-number">{categoryStats[cat]}</div>
            <div className="stat-subtext">đầu sách thuộc thể loại {cat}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPage;
