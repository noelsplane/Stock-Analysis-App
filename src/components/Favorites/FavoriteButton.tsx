import React, { useState, useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { StockData } from '../../types/stock';

interface FavoriteButtonProps {
  stock: StockData;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ stock }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const status = await isFavorite(stock.symbol);
      setIsFavorited(status);
    };
    checkFavoriteStatus();
  }, [isFavorite, stock.symbol]);

  const handleClick = async () => {
    if (isFavorited) {
      await removeFavorite(stock.symbol);
      setIsFavorited(false);
    } else {
      await addFavorite(stock);
      setIsFavorited(true);
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