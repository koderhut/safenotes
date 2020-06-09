import React from 'react';
import { render } from '@testing-library/react';

import Logo from './Logo';

describe('render a logo', () => {

  test('render a text logo with default second line', () => {
    const { container } = render(<Logo firstLine={<div><span>test</span><span>first line</span></div>} wrapClasses={["test", "classes"]} slClasses={['test', 'second-line']} />);
    const logo        = container.firstChild;

    expect(logo).toBeInTheDocument();
    expect(logo).toMatchInlineSnapshot(`
      <div
        class="test classes"
        data-type="logo"
      >
        <div>
          <span>
            test
          </span>
          <span>
            first line
          </span>
        </div>
        <div
          class="test second-line"
        >
          by &lt;koderhut.eu /&gt;
        </div>
      </div>
    `);
  });

});
