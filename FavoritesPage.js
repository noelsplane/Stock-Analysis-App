import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const industries = [...new Set(favorites.map(stock => stock.industry))];
  const filteredFavorites = selectedIndustry === 'all' 
    ? favorites 
    : favorites.filter(stock => stock.industry === selectedIndustry);

  const removeFavorite = (ticker) => {
    const updatedFavorites = favorites.filter(stock => stock.ticker !== ticker);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-page">
      <h1>Favorite Stocks</h1>
      
      <div className="industry-filter">
        <label htmlFor="industry-select">Filter by Industry:</label>
        <select 
          id="industry-select"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="all">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="no-favorites">
          <p>No favorites yet!</p>
          <p>Add stocks to your favorites from the stock details page.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map((stock) => (
            <div key={stock.ticker} className="favorite-card">
              <div className="card-header">
                <h3>{stock.ticker}</h3>
                <button 
                  className="remove-btn"
                  onClick={() => removeFavorite(stock.ticker)}
                >
                  ×
                </button>
              </div>
              <div className="card-content">
                <p className="stock-name">{stock.name}</p>
                <div className="stock-info">
                  <div className="info-row">
                    <span className="label">Industry:</span>
                    <span className="value">{stock.industry}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Sector:</span>
                    <span className="value">{stock.sector}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Price:</span>
                    <span className="value">${stock.price}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Market Cap:</span>
                    <span className="value">${stock.marketCap}</span>
                  </div>
                </div>
                <div className="last-updated">
                  Last updated: {new Date(stock.lastUpdated).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
