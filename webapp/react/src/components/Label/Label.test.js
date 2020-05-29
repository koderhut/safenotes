import React from 'react';
import { render } from '@testing-library/react';

import Label from './Label';

describe('render a label element', function () {

  test('render base label with text', () => {
    const { getByText } = render(<Label text={'test label'} labelFor={'test element'} classNames={['test', 'class']}/>);
    const label = getByText('test label');

    expect(label).toMatchInlineSnapshot(`
      <label
        class="test class"
        for="test element"
      >
        test label
      </label>
    `);
  });

  test('render label with children', () => {
    const { container } = render(<Label text={'test label'} labelFor={'test element'} classNames={['test', 'class']}><p>test</p></Label>);
    const label = container.firstChild;

    expect(label).toMatchInlineSnapshot(`
      <label
        class="test class"
        for="test element"
      >
        <p>
          test
        </p>
      </label>
    `);
  });

});
