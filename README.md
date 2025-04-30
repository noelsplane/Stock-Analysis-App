# Stock Analysis App

A React-based application for analyzing stock metrics and performance. This app allows users to query stock information, view key metrics, and analyze financial data.

## Features

- Stock symbol search with real-time data
- Display of key stock metrics:
  - Current stock price
  - 52-week high/low
  - Net income over time
- Clean, modern UI with responsive design
- Error handling and loading states

## Tech Stack

- React
- TypeScript
- Alpha Vantage API
- Axios for API requests
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alpha Vantage API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/noelsplane/Stock-Analysis-App.git
cd Stock-Analysis-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/
  │   └── StockQuery/
  │       ├── StockQueryForm.tsx
  │       └── StockMetrics.tsx
  ├── services/
  │   └── alphaVantage.ts
  ├── types/
  │   └── stock.ts
  ├── App.tsx
  └── App.css
```

## Usage

1. Enter a stock symbol (e.g., AAPL, MSFT, GOOGL) in the search field
2. Click "Get Stock Data" to fetch and display the stock information
3. View the current price, 52-week high/low, and net income over time

## Contributing

This project is part of a team effort. Each member has specific responsibilities:

- Member 1: Front-End Stock Query & Metrics Display
- Member 2: Metrics Calculation and Business Logic
- Member 3: Favorites and Database
- Member 4: Favorites Filtering & Bonus Features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Alpha Vantage for providing the stock data API
- Create React App for the project setup
- The team members for their contributions
