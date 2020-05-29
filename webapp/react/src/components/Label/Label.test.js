import React from 'react';
import { render } from '@testing-library/react';

import Label from './Label';

describe('creates a label element', function () {
  test('', () => {
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
});
