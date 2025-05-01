import React, { useState, useEffect } from 'react';
import './StockDetails.css';

const StockDetails = ({ stock }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(favorites.some(item => item.ticker === stock.ticker));
  }, [stock.ticker]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorited) {
      favorites = favorites.filter(item => item.ticker !== stock.ticker);
    } else {
      const stockData = {
        ticker: stock.ticker,
        name: stock.name,
        industry: stock.industry,
        sector: stock.sector,
        price: stock.price,
        marketCap: stock.marketCap,
        volume: stock.volume,
        lastUpdated: new Date().toISOString()
      };
      favorites.push(stockData);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="stock-details">
      <div className="stock-header">
        <h2>{stock.ticker}</h2>
        <button 
          className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={handleFavorite}
        >
          {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
        </button>
      </div>
      <div className="stock-info">
        <h3>{stock.name}</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Industry:</span>
            <span className="value">{stock.industry}</span>
          </div>
          <div className="info-item">
            <span className="label">Sector:</span>
            <span className="value">{stock.sector}</span>
          </div>
          <div className="info-item">
            <span className="label">Current Price:</span>
            <span className="value">${stock.price}</span>
          </div>
          <div className="info-item">
            <span className="label">Market Cap:</span>
            <span className="value">${stock.marketCap}</span>
          </div>
          <div className="info-item">
            <span className="label">Volume:</span>
            <span className="value">{stock.volume}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails; 
