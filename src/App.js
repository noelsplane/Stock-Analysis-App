import React, { useState } from 'react';
import './App.css';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import StockMetrics from './components/StockQuery/StockMetrics';
import FavoritesPage from './components/FavoritesPage';
import { fetchStockData } from './services/alphaVantage';

function App() {
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleStockQuery = async (symbol) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
      setShowFavorites(false);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Analyzer</h1>
        <nav>
          <button 
            onClick={() => setShowFavorites(false)}
            className={!showFavorites ? 'active' : ''}
          >
            Search Stocks
          </button>
          <button 
            onClick={() => setShowFavorites(true)}
            className={showFavorites ? 'active' : ''}
          >
            Favorites
          </button>
        </nav>
      </header>
      <main className="App-main">
        {showFavorites ? (
          <FavoritesPage />
        ) : (
          <>
            <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
            <StockMetrics data={stockData} isLoading={isLoading} error={error} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
