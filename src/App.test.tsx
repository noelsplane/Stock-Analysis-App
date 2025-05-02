
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders stock query form', () => {
  render(<App />);
  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
});

