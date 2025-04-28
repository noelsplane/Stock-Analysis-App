import React from 'react';
import { StockMetricsProps } from '../../types/stock';

const StockMetrics: React.FC<StockMetricsProps> = ({ data, isLoading, error }) => {
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
      </div>

      <div className="net-income-section">
        <h3>Net Income Over Time</h3>
        <div className="net-income-chart">
          {data.netIncome.map((item) => (
            <div key={item.year} className="net-income-bar">
              <div className="bar-label">{item.year}</div>
              <div className="bar-value">${(item.value / 1000000).toFixed(2)}M</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMetrics; 