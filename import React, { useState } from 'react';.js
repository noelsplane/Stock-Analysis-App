import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = C5ZSRLGRQ3YEXBZ2; 

  const fetchStockData = async (symbol) => {
    try {
      // Get current stock price
      const quoteResponse = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );

      // Get weekly data for 52-week high/low
      const weeklyResponse = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`
      );

      // Get income statement data
      const incomeResponse = await axios.get(
        `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY}`
      );

      const currentPrice = parseFloat(quoteResponse.data['Global Quote']['05. price']);
      
      // Calculate 52-week high/low from weekly data
      const weeklyData = Object.values(weeklyResponse.data['Weekly Time Series']);
      const yearData = weeklyData.slice(0, 52);
      const high52 = Math.max(...yearData.map(day => parseFloat(day['2. high'])));
      const low52 = Math.min(...yearData.map(day => parseFloat(day['3. low'])));

      setStockData({
        symbol,
        currentPrice,
        high52,
        low52,
        incomeData: incomeResponse.data.annualReports
      });
      setError(null);
    } catch (err) {
      setError('Error fetching stock data. Please try again.');
      setStockData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      fetchStockData(ticker.trim().toUpperCase());
    }
  };

  return (
    <div className="App">
      <h1>Stock Analysis App</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker symbol"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {stockData && (
        <div className="stock-info">
          <h2>{stockData.symbol}</h2>
          <div className="metrics">
            <p>Current Price: ${stockData.currentPrice.toFixed(2)}</p>
            <p>52-Week High: ${stockData.high52.toFixed(2)}</p>
            <p>52-Week Low: ${stockData.low52.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
