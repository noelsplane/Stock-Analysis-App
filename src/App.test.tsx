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
      setError('Failed to fetch stock data');
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Stock Analysis App</h1>
          <nav>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={showFavorites ? 'active' : ''}
            >
              {showFavorites ? 'Search Stocks' : 'View Favorites'}
            </button>
          </nav>
        </header>
        <main className="App-main">
          {showFavorites ? (
            <FavoritesPage />
          ) : (
            <>
              <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
              {error && <div className="error">{error}</div>}
              {isLoading && <div className="loading">Loading...</div>}
              {stockData && <StockMetrics stockData={stockData} />}
            </>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App; 
