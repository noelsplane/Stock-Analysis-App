import React, { useState } from 'react';
import { StockQueryFormProps } from '../../types/stock';

const StockQueryForm: React.FC<StockQueryFormProps> = ({ onSubmit, isLoading }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.trim().toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stock-query-form">
      <div className="form-group">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="form-control"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading || !symbol.trim()}
        >
          {isLoading ? 'Loading...' : 'Get Stock Data'}
        </button>
      </div>
    </form>
  );
};

export default StockQueryForm; 