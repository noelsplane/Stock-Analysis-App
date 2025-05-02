import { StockData } from '../types/stock';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockData(symbol: string): Promise<StockData> {
  if (!API_KEY) {
    throw new Error('Alpha Vantage API key not found');
  }

  const response = await fetch(
    `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }

  const data = await response.json();
  const quote = data['Global Quote'];

  if (!quote) {
    throw new Error('Invalid stock symbol or no data available');
  }

  // Fetch additional data for P/E ratio and dividend yield
  const overviewResponse = await fetch(
    `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
  );
  const overviewData = await overviewResponse.json();

  return {
    symbol: quote['01. symbol'],
    name: quote['01. symbol'], // Alpha Vantage doesn't provide company name in this endpoint
    price: parseFloat(quote['05. price']),
    marketCap: parseFloat(overviewData.MarketCapitalization) || 0,
    peRatio: parseFloat(overviewData.PERatio) || 0,
    dividendYield: parseFloat(overviewData.DividendYield) || 0,
    netIncome: [], // This would need to be fetched from a different endpoint
    industry: overviewData.Industry || 'Unknown',
    high52Week: parseFloat(quote['52. week high']) || 0,
    low52Week: parseFloat(quote['52. week low']) || 0
  };
} 
