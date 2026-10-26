import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Moon, Sun, BarChart2, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand">
          <Library size={24} color="var(--accent-color)" />
          <span>Mini Library</span>
        </Link>
        <div className="nav-actions">
          {location.pathname === '/stats' ? (
            <Link to="/" className="nav-link">
              <BookOpen size={16} />
              <span>Tra cứu sách</span>
            </Link>
          ) : (
            <Link to="/stats" className="nav-link">
              <BarChart2 size={16} />
              <span>Thống kê</span>
            </Link>
          )}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Chuyển đổi giao diện sáng tối"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
