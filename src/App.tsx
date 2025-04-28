import React, { useState } from 'react';
import './App.css';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import StockMetrics from './components/StockQuery/StockMetrics';
import { fetchStockData } from './services/alphaVantage';
import { StockData } from './types/stock';

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
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Analyzer</h1>
      </header>
      <main className="App-main">
        <StockQueryForm onSubmit={handleStockQuery} isLoading={isLoading} />
        <StockMetrics data={stockData} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
}

export default App;
