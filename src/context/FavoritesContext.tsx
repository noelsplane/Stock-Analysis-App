import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StockData } from '../types/stock';
import { FavoritesService } from '../services/FavoritesService';

interface FavoritesContextType {
  favorites: StockData[];
  addFavorite: (stock: StockData) => Promise<void>;
  removeFavorite: (symbol: string) => Promise<void>;
  isFavorite: (symbol: string) => Promise<boolean>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<StockData[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const loadedFavorites = await FavoritesService.getFavorites();
      setFavorites(loadedFavorites);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (stock: StockData) => {
    await FavoritesService.addFavorite(stock);
    setFavorites(await FavoritesService.getFavorites());
  };

  const removeFavorite = async (symbol: string) => {
    await FavoritesService.removeFavorite(symbol);
    setFavorites(await FavoritesService.getFavorites());
  };

  const isFavorite = (symbol: string) => {
    return FavoritesService.isFavorite(symbol);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
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