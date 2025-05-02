import React, { useState, useEffect } from 'react';
import { calculateGrowthMetrics } from '../../utils/financialCalculations';
import { FavoritesService } from '../../services/FavoritesService';
import { Stock, StockData, StockMetricsProps } from '../../types/favorites';
import { GrowthMetrics } from '../../types/financial';

const StockMetrics: React.FC<StockMetricsProps> = ({ data, isLoading, error }: StockMetricsProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const favorites = FavoritesService.getFavorites();
      setIsFavorite(favorites.some(fav => fav.ticker === data.symbol));
    }
  }, [data]);

  const toggleFavorite = (): void => {
    if (!data) return;

    const stock: Stock = {
      ticker: data.symbol,
      name: data.symbol, // We'll need to get the actual company name
      industry: 'Unknown', // We'll need to get the actual industry
      sector: 'Unknown', // We'll need to get the actual sector
      price: data.price,
      marketCap: 0, // We'll need to get the actual market cap
      volume: 0, // We'll need to get the actual volume
      lastUpdated: new Date().toISOString()
    };

    if (isFavorite) {
      FavoritesService.removeFavorite(data.symbol);
    } else {
      FavoritesService.addFavorite(stock);
    }
    setIsFavorite(!isFavorite);
  };

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
    const hasValidEarnings = data.netIncome.some((item: { value: number }) => item.value > 0);
    if (!hasValidEarnings) {
      throw new Error('No positive earnings data available');
    }

    // Calculate earnings per share (assuming 1M shares outstanding)
    const earningsPerShare = data.netIncome[data.netIncome.length - 1].value / 1000000;
    if (earningsPerShare <= 0) {
      throw new Error('Earnings per share is not positive');
    }

    growthMetrics = data.growthMetrics || calculateGrowthMetrics(
      data.netIncome.map((item: { value: number; year: number }) => ({
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
      <div className="stock-header">
        <h2>{data.symbol} Stock Metrics</h2>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
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
          {data.netIncome.map((item: { year: number; value: number }) => (
            <div key={item.year} className="net-income-bar">
              <div className="bar-label">{item.year}</div>
              <div 
                className="bar-value" 
                style={{ height: `${Math.abs(item.value) / 1000000}px` }}
              />
              <div className="bar-value-label">${(item.value / 1000000).toFixed(2)}M</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMetrics; 
