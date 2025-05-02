import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import StockMetrics from './components/StockQuery/StockMetrics';
import FavoritesPage from './components/Favorites/FavoritesPage';
import { fetchStockData } from './services/alphaVantage';
import { StockData } from './types/stock';
import './App.css';

function App() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStockQuery = async (symbol: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <FavoritesProvider>
        <div className="App">
          <nav className="navbar">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
                  {error && <div className="error">{error}</div>}
                  {stockData && <StockMetrics data={stockData} isLoading={isLoading} error={error} />}
                </>
              } />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;

