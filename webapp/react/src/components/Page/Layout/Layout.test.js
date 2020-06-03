import React from 'react';
import { render } from '@testing-library/react';

import Layout from './Layout';

describe('it renders a layout', () => {

  test('renders empty layout', () => {
    const { getByTestId } = render(<Layout classes={['test', 'classes']} attrs={{'data-testid': 'empty'}} />);
    const layout        = getByTestId('empty');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="empty"
      >
        <p>
          This is an empty layout!
        </p>
      </div>
   `);
  });

  test('renders layout with children', () => {
    const { getByTestId } = render(<Layout classes={['test', 'classes']} attrs={{'data-testid': 'with-children' }}><p>test child of layout</p></Layout>);
    const layout        = getByTestId('with-children');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="with-children"
      >
        <p>
          test child of layout
        </p>
      </div>
   `);
  });

  test('renders layout can receive any attribute', () => {
    const { getByTestId } = render(<Layout classes={['test', 'classes']} attrs={{'test-attr': 'test-attr-val', 'data-testid': 'with-attr' }} />);
    const layout        = getByTestId('with-attr');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="with-attr"
        test-attr="test-attr-val"
      >
        <p>
          This is an empty layout!
        </p>
      </div>
   `);
  });

});
