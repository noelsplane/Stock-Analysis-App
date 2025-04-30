import React, { useState } from 'react';

const StockDetails = ({ stock }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorited) {
      
      favorites = favorites.filter(item => item.ticker !== stock.ticker);
    } else {
      
      favorites.push(stock);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      <h2>{stock.ticker}</h2>
      <p>Industry: {stock.industry}</p>
      <p>Current Price: {stock.price}</p>
      <button onClick={handleFavorite}>
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default StockDetails;
