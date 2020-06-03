import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';

describe('testing the footer component', () => {

  test('render an empty footer', () => {
    const { container } = render(<Footer />);
    const header        = container.firstChild;

    expect(header).toBeInTheDocument();
    expect(header).toMatchInlineSnapshot(`
      <footer
        class=""
      />
    `);
  });

  test('render an footer with children', () => {
    const { container } = render(<Footer attrs={{'test-attr': 'test-attr-val'}}><p>test footer p element</p></Footer>);
    const header        = container.firstChild;

    expect(header).toBeInTheDocument();
    expect(header).toMatchInlineSnapshot(`
      <footer
        class=""
        test-attr="test-attr-val"
      >
        <p>
          test footer p element
        </p>
      </footer>
    `);
  });

  test('render an footer with attributes', () => {
    const { container } = render(<Footer attrs={{'test-attr': 'test-attr-val'}} />);
    const header        = container.firstChild;

    expect(header).toBeInTheDocument();
    expect(header).toMatchInlineSnapshot(`
      <footer
        class=""
        test-attr="test-attr-val"
      />
    `);
  });

});
