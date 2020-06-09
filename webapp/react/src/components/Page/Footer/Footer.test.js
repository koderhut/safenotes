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
