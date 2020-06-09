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
