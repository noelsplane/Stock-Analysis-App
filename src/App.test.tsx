import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from '@jest/globals';

describe('App', () => {
  it('renders stock query form', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check for the app title
    const titleElement = screen.getByText(/Stock Analysis App/i);
    expect(titleElement).toBeTruthy();
    
    // Check for the favorites button
    const favoritesButton = screen.getByText(/View Favorites/i);
    expect(favoritesButton).toBeTruthy();
  });
});
