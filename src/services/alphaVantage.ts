import { StockData } from '../types/stock';

const API_KEY = 'C5ZSRLGRQ3YEXBZ2';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol: string): Promise<StockData> => {
  const response = await fetch(
    `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }

  const data = await response.json();
  const quote = data['Global Quote'];

  if (!quote || !quote['01. symbol']) {
    throw new Error('Invalid stock symbol');
  }

  return {
    symbol: quote['01. symbol'],
    name: quote['01. symbol'], // Alpha Vantage doesn't provide company name in this endpoint
    industry: '', // Alpha Vantage doesn't provide this in this endpoint
    sector: '', // Alpha Vantage doesn't provide this in this endpoint
    price: parseFloat(quote['05. price']),
    marketCap: 0, // Alpha Vantage doesn't provide this in this endpoint
    volume: parseInt(quote['06. volume']),
    lastUpdated: new Date().toISOString(),
    high52Week: 0, // Alpha Vantage doesn't provide this in this endpoint
    low52Week: 0, // Alpha Vantage doesn't provide this in this endpoint
    netIncome: [], // Alpha Vantage doesn't provide this in this endpoint
    growthMetrics: undefined // Alpha Vantage doesn't provide this in this endpoint
  };
}; 
