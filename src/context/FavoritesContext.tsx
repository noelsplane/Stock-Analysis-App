import React, { createContext, useContext, useState, useEffect } from 'react';
import { FavoritesContextType, FavoriteStock } from '../types/stock';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load favorites from localStorage on initial mount
    const loadFavorites = () => {
      setLoading(true);
      try {
        const storedFavorites = localStorage.getItem('favoriteStocks');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (err) {
        setError('Failed to load favorites');
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = (stock: FavoriteStock) => {
    setLoading(true);
    try {
      const updatedFavorites = [...favorites, stock];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
    } catch (err) {
      setError('Failed to add favorite');
      console.error('Error adding favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (symbol: string) => {
    setLoading(true);
    try {
      const updatedFavorites = favorites.filter(fav => fav.symbol !== symbol);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
    } catch (err) {
      setError('Failed to remove favorite');
      console.error('Error removing favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (symbol: string) => {
    return favorites.some(fav => fav.symbol === symbol);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        loading,
        error
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 