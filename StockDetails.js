import React, { useState, useEffect } from 'react';
import { FavoritesService } from './src/services/FavoritesService';
import './StockDetails.css';

const StockDetails = ({ stock }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(FavoritesService.isFavorite(stock.ticker));
  }, [stock.ticker]);

  const handleFavorite = () => {
    if (isFavorited) {
      FavoritesService.removeFavorite(stock.ticker);
    } else {
      FavoritesService.addFavorite({
        ...stock,
        lastUpdated: new Date().toISOString()
      });
    }
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
