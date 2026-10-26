import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useFilterStore } from '../features/filters/filterStore';
import { useDebounce } from '../hooks/useDebounce';
import { CategoryFilter } from '../types/book';

const categories: CategoryFilter[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'];

export const SearchBar: React.FC = () => {
  const { keyword, category, setKeyword, setCategory } = useFilterStore();
  const [searchTerm, setSearchTerm] = useState(keyword);
  const debouncedKeyword = useDebounce<string>(searchTerm, 300);

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword, setKeyword]);

  return (
    <div className="search-filter-section">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
