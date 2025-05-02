import { StockData } from '../types/stock';

const API_KEY = 'CX8QLUH2EGEGV8S6';
const BASE_URL = 'https://www.alphavantage.co/query';

function calculateGrowthRate(values: number[]): number {
  if (values.length < 2) return 0;
  const oldestValue = values[0];
  const newestValue = values[values.length - 1];
  if (oldestValue <= 0) return 0;
  return ((newestValue - oldestValue) / Math.abs(oldestValue)) * 100;
}

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

  // Fetch quarterly income statements
  const incomeResponse = await fetch(
    `${BASE_URL}?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY}`
  );
  const incomeData = await incomeResponse.json();

  // Extract the last 4 quarters of net income and revenue
  const quarterlyReports = incomeData.quarterlyReports || [];
  const netIncome = quarterlyReports
    .slice(0, 4)
    .map((report: any) => parseFloat(report.netIncome) || 0)
    .reverse(); // Reverse to show oldest to newest

  const revenue = quarterlyReports
    .slice(0, 4)
    .map((report: any) => parseFloat(report.totalRevenue) || 0)
    .reverse();

  // Calculate growth rates
  const netIncomeGrowthRate = calculateGrowthRate(netIncome);
  const revenueGrowthRate = calculateGrowthRate(revenue);
  
  // Calculate growth rate over PE ratio
  const peRatio = parseFloat(overviewData.PERatio) || 0;
  const growthAdjustedPE = peRatio > 0 ? revenueGrowthRate / peRatio : 0;

  return {
    symbol: quote['01. symbol'],
    name: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    marketCap: parseFloat(overviewData.MarketCapitalization) || 0,
    peRatio: peRatio,
    dividendYield: parseFloat(overviewData.DividendYield) || 0,
    netIncome: netIncome,
    industry: overviewData.Industry || 'Unknown',
    high52Week: parseFloat(quote['52. week high']) || 0,
    low52Week: parseFloat(quote['52. week low']) || 0,
    revenueGrowthRate,
    netIncomeGrowthRate,
    growthAdjustedPE
  };
} 
