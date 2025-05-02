import React, { useState, useEffect } from 'react';
import { StockData } from '../../types/stock';
import { useFavorites } from '../../context/FavoritesContext';
import './StockMetrics.css';

interface StockMetricsProps {
  stockData: StockData;
}

const StockMetrics: React.FC<StockMetricsProps> = ({ stockData }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const status = await isFavorite(stockData.symbol);
      setIsFavorited(status);
    };
    checkFavoriteStatus();
  }, [isFavorite, stockData.symbol]);

  const handleFavoriteClick = async () => {
    if (isFavorited) {
      await removeFavorite(stockData.symbol);
      setIsFavorited(false);
    } else {
      await addFavorite(stockData);
      setIsFavorited(true);
    }
  };

  return (
    <div className="stock-metrics">
      <div className="stock-header">
        <h2>{stockData.symbol}</h2>
        <button
          className={`favorite-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          ★
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Current Price</h3>
          <p>${stockData.price.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>Market Cap</h3>
          <p>${(stockData.marketCap / 1e9).toFixed(2)}B</p>
        </div>
        <div className="metric-card">
          <h3>P/E Ratio</h3>
          <p>{stockData.peRatio.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>Dividend Yield</h3>
          <p className={stockData.dividendYield > 0 ? 'positive' : 'negative'}>
            {stockData.dividendYield.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="net-income-section">
        <h3>Net Income (Last 4 Quarters)</h3>
        <div className="net-income-chart">
          {stockData.netIncome.map((income, index) => (
            <div key={index} className="net-income-bar">
              <div
                className="bar-value"
                style={{
                  height: `${Math.abs(income) / 1000}px`,
                  backgroundColor: income >= 0 ? 'var(--success-color)' : 'var(--error-color)'
                }}
              />
              <div className="bar-label">Q{4 - index}</div>
              <div className="bar-value-label">${(income / 1e6).toFixed(1)}M</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMetrics; 
