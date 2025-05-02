import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { FavoriteStock } from '../../types/stock';

interface FavoriteButtonProps {
  stock: FavoriteStock;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ stock }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = isFavorite(stock.symbol);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(stock.symbol);
    } else {
      addFavorite({
        ...stock,
        addedAt: new Date().toISOString()
      });
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton; 