import React from 'react';
import { render } from '@testing-library/react';

import Header from './Header';

describe('testing the header component', () => {

  test('render an empty header', () => {
    const { container } = render(<Header />);
    const header        = container.firstChild;

    expect(header).toBeInTheDocument();
    expect(header).toMatchInlineSnapshot(`
      <header
        class=""
      />
    `);
  });

  test('render an header with attributes', () => {
    const { container } = render(<Header attrs={{'test-attr': 'test-attr-val'}} />);
    const header        = container.firstChild;

    expect(header).toBeInTheDocument();
    expect(header).toMatchInlineSnapshot(`
      <header
        class=""
        test-attr="test-attr-val"
      />
    `);
  });

});
