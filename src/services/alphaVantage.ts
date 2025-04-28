import axios from 'axios';
import { StockData } from '../types/stock';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol: string): Promise<StockData> => {
  try {
    // Fetch current price and 52-week high/low
    const quoteResponse = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY
      }
    });

    // Fetch income statement for net income data
    const incomeResponse = await axios.get(BASE_URL, {
      params: {
        function: 'INCOME_STATEMENT',
        symbol,
        apikey: API_KEY
      }
    });

    const quoteData = quoteResponse.data['Global Quote'];
    const incomeData = incomeResponse.data.annualReports;

    return {
      symbol,
      price: parseFloat(quoteData['05. price']),
      high52Week: parseFloat(quoteData['52WeekHigh']),
      low52Week: parseFloat(quoteData['52WeekLow']),
      netIncome: incomeData.map((report: any) => ({
        year: parseInt(report.fiscalDateEnding.split('-')[0]),
        value: parseFloat(report.netIncome)
      }))
    };
  } catch (error) {
    throw new Error('Failed to fetch stock data');
  }
}; 