import React from 'react';
import { render } from '@testing-library/react';

import Block from './Block';

describe('it renders a block', () => {

  test('renders empty content block', () => {
    const { getByTestId } = render(<Block classes={['test', 'classes']} attrs={{ 'data-testid': 'empty' }}/>);
    const layout          = getByTestId('empty');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="empty"
      >
        <p>
          This is an empty block!
        </p>
      </div>
   `);
  });

  test('renders content block with children', () => {
    const { getByTestId } = render(<Block classes={['test', 'classes']} attrs={{ 'data-testid': 'with-children' }}><p>test child of block</p></Block>);
    const layout          = getByTestId('with-children');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="with-children"
      >
        <p>
          test child of block
        </p>
      </div>
   `);
  });

  test('renders a block that can receive any attribute', () => {
    const { getByTestId } = render(<Block classes={['test', 'classes']} attrs={{ 'test-attr': 'test-attr-val', 'data-testid': 'with-attr' }}/>);
    const layout          = getByTestId('with-attr');

    expect(layout).toBeInTheDocument();
    expect(layout).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-testid="with-attr"
        test-attr="test-attr-val"
      >
        <p>
          This is an empty block!
        </p>
      </div>
   `);
  });

});
