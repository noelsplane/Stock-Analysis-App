// src/components/FavoritesPage.tsx
import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>Your Favorite Stocks</h1>
      <select onChange={(e) => setSelectedIndustry(e.target.value)} value={selectedIndustry}>
        <option value="all">All Industries</option>
        {industries.map((industry, index) => (
          <option key={index} value={industry}>{industry}</option>
        ))}
      </select>
      <div>
        {filteredFavorites.map((stock, index) => (
          <div key={index}>
            <h2>{stock.name}</h2>
            <p>{stock.ticker}</p>
            <p>{stock.industry}</p>
            {/* You can add more stock details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

