import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { StockData } from '../../types/stock';

interface FavoriteButtonProps {
  stock: StockData;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ stock }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFavorited = isFavorite(stock.symbol);

  const handleClick = () => {
    if (isFavorited) {
      removeFavorite(stock.symbol);
    } else {
      addFavorite(stock);
    }
  };

  return (
    <button
      className={`favorite-btn ${isFavorited ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      ★
    </button>
  );
};

export default FavoriteButton; 