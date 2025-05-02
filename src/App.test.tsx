import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import StockMetrics from './components/StockQuery/StockMetrics';
import FavoritesPage from './components/FavoritesPage';
import { fetchStockData } from './services/alphaVantage';
import { StockData } from './types/stock';

function App() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

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
      <div className="App">
        <nav className="navbar">
          <div className="nav-links">
            <button onClick={() => setShowFavorites(false)}>Home</button>
            <button onClick={() => setShowFavorites(true)}>Favorites</button>
          </div>
        </nav>

        <main className="main-content">
          {showFavorites ? (
            <FavoritesPage />
          ) : (
            <>
              <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
              {error && <div className="error">{error}</div>}
              {stockData && <StockMetrics data={stockData} isLoading={isLoading} error={error} />}
            </>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App; 
