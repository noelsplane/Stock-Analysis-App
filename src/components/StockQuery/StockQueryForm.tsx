import React, { useState } from 'react';
import { StockQueryFormProps } from '../../types/stock';

const StockQueryForm: React.FC<StockQueryFormProps> = ({ onSubmit, isLoading }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stock-query-form">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !symbol.trim()}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </form>
  );
};

export default StockQueryForm; 
