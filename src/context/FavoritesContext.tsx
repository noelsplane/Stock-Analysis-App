import React, { createContext, useContext, useState, useEffect } from 'react';
import { StockData } from '../types/stock';
import { FavoritesService } from '../services/FavoritesService';

interface FavoritesContextType {
  favorites: StockData[];
  addFavorite: (stock: StockData) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<StockData[]>([]);
  const favoritesService = new FavoritesService();

  useEffect(() => {
    const loadFavorites = async () => {
      const loadedFavorites = await favoritesService.getFavorites();
      setFavorites(loadedFavorites);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (stock: StockData) => {
    await favoritesService.addFavorite(stock);
    setFavorites(await favoritesService.getFavorites());
  };

  const removeFavorite = async (symbol: string) => {
    await favoritesService.removeFavorite(symbol);
    setFavorites(await favoritesService.getFavorites());
  };

  const isFavorite = (symbol: string) => {
    return favorites.some(stock => stock.symbol === symbol);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 