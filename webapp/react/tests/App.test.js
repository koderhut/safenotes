import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders website link in header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/by koderhut.eu/i);
  expect(linkElement).toBeInTheDocument();
});
