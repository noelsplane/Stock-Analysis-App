// src/utils/financialCalculations.tsx
import React, { FC } from 'react';
import { StockMetricsProps } from '../../types/stock'; // Ensure the path is correct

const StockMetrics: FC<StockMetricsProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">Loading stock data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="stock-metrics">
      <h2>{data.symbol} Stock Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Current Price</h3>
          <p>${data.price.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>52-Week High</h3>
          <p>${data.high52Week.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h3>52-Week Low</h3>
          <p>${data.low52Week.toFixed(2)}</p>
        </div>
        {/* Add additional metrics as needed */}
      </div>
    </div>
  );
};

export default StockMetrics;

