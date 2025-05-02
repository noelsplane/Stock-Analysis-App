import React, { useState } from 'react';
import './App.css';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import StockMetrics from './components/StockQuery/StockMetrics';
import FavoritesPage from './components/FavoritesPage';
import { fetchStockData } from './services/alphaVantage';
import { StockData } from './types/favorites';

function App() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
        <h1>Stock Analysis App</h1>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Back to Search' : 'View Favorites'}
        </button>
      </header>
      <main>
        {showFavorites ? (
          <FavoritesPage />
        ) : (
          <>
            <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
            {error && <div className="error">{error}</div>}
            {stockData && <StockMetrics data={stockData} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App; 
