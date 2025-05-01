const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol) => {
  try {
    // Fetch company overview
    const overviewResponse = await fetch(
      `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    );
    const overviewData = await overviewResponse.json();

    // Fetch income statement
    const incomeResponse = await fetch(
      `${BASE_URL}?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY}`
    );
    const incomeData = await incomeResponse.json();

    // Fetch quote
    const quoteResponse = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const quoteData = await quoteResponse.json();

    // Process and combine the data
    const stockData = {
      symbol: overviewData.Symbol,
      name: overviewData.Name,
      industry: overviewData.Industry,
      sector: overviewData.Sector,
      price: parseFloat(quoteData['Global Quote']['05. price']),
      high52Week: parseFloat(overviewData['52WeekHigh']),
      low52Week: parseFloat(overviewData['52WeekLow']),
      marketCap: parseFloat(overviewData.MarketCapitalization),
      volume: parseInt(quoteData['Global Quote']['06. volume']),
      netIncome: incomeData.annualReports.map(report => ({
        year: parseInt(report.fiscalDateEnding.split('-')[0]),
        value: parseFloat(report.netIncome)
      }))
    };

    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Failed to fetch stock data');
  }
};
