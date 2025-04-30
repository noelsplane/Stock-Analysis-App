import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          favorites.map((stock, index) => (
            <li key={index}>
              {stock.ticker} - {stock.industry} - ${stock.price}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FavoritesPage;
