import React, { useState } from 'react';
import './StockQueryForm.css';

const StockQueryForm = ({ onSubmit, isLoading }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.trim().toUpperCase());
    }
  };

  return (
    <form className="stock-query-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !symbol.trim()}
        >
          {isLoading ? 'Loading...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};

export default StockQueryForm; 
