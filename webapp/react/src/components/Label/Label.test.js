/*
 * Copyright (c) 2020. Denis Rendler <connect@rendler.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
