import React, { useState, useEffect } from 'react';
import './FavoritesPage.css'; // Import the CSS styles

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Get unique industries from favorites
  const industries = [...new Set(favorites.map(stock => stock.industry))];

  // Filter favorites by selected industry
  const filteredFavorites = selectedIndustry === 'all'
    ? favorites
    : favorites.filter(stock => stock.industry === selectedIndustry);

  return (
    <div className="favorites-container">
      <h1>Your Favorite Stocks</h1>
      <div className="industry-filter">
        <select onChange={(e) => setSelectedIndustry(e.target.value)} value={selectedIndustry}>
          <option value="all">All Industries</option>
          {industries.map((industry, index) => (
            <option key={index} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="favorites-grid">
        {filteredFavorites.map((stock, index) => (
          <div key={index} className="favorite-card">
            <h3>{stock.name}</h3>
            <p>{stock.ticker}</p>
            <p>{stock.industry}</p>
            <button className="remove-button" onClick={() => handleRemove(stock.ticker)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Function to remove a stock from favorites
  const handleRemove = (ticker: string) => {
    const updatedFavorites = favorites.filter(stock => stock.ticker !== ticker);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
};

export default FavoritesPage;
