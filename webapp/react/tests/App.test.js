import React from 'react';
import { render } from '@testing-library/react';

import SafeNotes from "../src/SafeNotes";

test('renders website link in header', () => {
  const { getByText } = render(<SafeNotes />);
  const linkElement = getByText(/by koderhut.eu/i);
  expect(linkElement).toBeInTheDocument();
});
