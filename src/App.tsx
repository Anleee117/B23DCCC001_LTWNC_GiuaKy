import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { fetchBooks } from './features/books/booksSlice';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';

const StatsPage = React.lazy(() => import('./pages/StatsPage'));

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/stats"
            element={
              <Suspense
                fallback={
                  <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Đang tải thống kê...</p>
                  </div>
                }
              >
                <StatsPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
