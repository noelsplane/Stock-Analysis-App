// src/types/stock.ts

// Define the Stock interface with the necessary fields
export interface Stock {
  ticker: string;
  name: string;
  industry: string;
  sector: string;
  price: number;
  marketCap: number;
  volume: number;
  lastUpdated: string;
}

// Define the stock data that will be used in the app
export const defaultStocks: Stock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    industry: "Technology",
    sector: "Tech",
    price: 145.09,
    marketCap: 2.41e12,
    volume: 74500000,
    lastUpdated: "2025-04-30",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    industry: "Technology",
    sector: "Tech",
    price: 2735.70,
    marketCap: 1.83e12,
    volume: 1200000,
    lastUpdated: "2025-04-30",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    industry: "Consumer Services",
    sector: "Retail",
    price: 3445.70,
    marketCap: 1.74e12,
    volume: 2200000,
    lastUpdated: "2025-04-30",
  },
  // Add more stocks as needed
];

// Interface for Stock metrics, useful for calculating growth, etc.
export interface StockMetricsProps {
  data: Stock | null;
  isLoading: boolean;
  error: string | null;
}

// Define the type for a list of favorite stocks
export interface FavoriteStock {
  ticker: string;
  name: string;
  industry: string;
  sector: string;
  price: number;
  marketCap: number;
  volume: number;
  lastUpdated: string;
}

// Define utility functions for favorite stock management
export const addFavoriteStock = (favoriteStock: FavoriteStock, favorites: FavoriteStock[]) => {
  if (!favorites.find(stock => stock.ticker === favoriteStock.ticker)) {
    favorites.push(favoriteStock);
  }
};

export const removeFavoriteStock = (ticker: string, favorites: FavoriteStock[]) => {
  const index = favorites.findIndex(stock => stock.ticker === ticker);
  if (index !== -1) {
    favorites.splice(index, 1);
  }
};

// Function to check if a stock is in the favorites list
export const isStockFavorite = (ticker: string, favorites: FavoriteStock[]) => {
  return favorites.some(stock => stock.ticker === ticker);
};
