import React from 'react';
import { calculateGrowthMetrics } from '../../utils/financialCalculations';
import { FavoritesService } from '../../services/FavoritesService';

const StockMetrics = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">Loading stock data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return null;
  }

  // Calculate growth metrics if not already calculated
  let growthMetrics = null;
  let errorMessage = null;

  try {
    // Check if we have valid earnings data
    const hasValidEarnings = data.netIncome.some(item => item.value > 0);
    if (!hasValidEarnings) {
      throw new Error('No positive earnings data available');
    }

    // Calculate earnings per share (assuming 1M shares outstanding)
    const earningsPerShare = data.netIncome[data.netIncome.length - 1].value / 1000000;
    if (earningsPerShare <= 0) {
      throw new Error('Earnings per share is not positive');
    }

    growthMetrics = data.growthMetrics || calculateGrowthMetrics(
      data.netIncome.map(item => ({
        netIncome: item.value,
        price: data.price,
        earningsPerShare: item.value / 1000000,
        year: item.year
      })),
      data.price
    );
  } catch (calcError) {
    errorMessage = calcError instanceof Error ? calcError.message : 'Unable to calculate growth metrics';
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

        {growthMetrics ? (
          <>
            <div className="metric-card">
              <h3>Growth Rate</h3>
              <p className={growthMetrics.growthRate > 0 ? 'positive' : 'negative'}>
                {growthMetrics.growthRate.toFixed(2)}%
              </p>
            </div>

            <div className="metric-card">
              <h3>P/E Ratio</h3>
              <p>{growthMetrics.peRatio.toFixed(2)}</p>
            </div>

            <div className="metric-card">
              <h3>Growth/P-E Ratio</h3>
              <p className={growthMetrics.isGrowthHigherThanPe ? 'positive' : 'negative'}>
                {growthMetrics.growthToPeRatio.toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <div className="metric-card error-message">
            <h3>Growth Metrics</h3>
            <p className="error">{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="net-income-section">
        <h3>Net Income Over Time</h3>
        <div className="net-income-chart">
          {data.netIncome.map(item => (
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
