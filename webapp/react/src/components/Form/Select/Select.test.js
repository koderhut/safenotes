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
import { fireEvent, render } from '@testing-library/react';

import Select from './Select';

describe('Select: ', () => {

  test('renders empty select box', () => {
    const { getByRole } = render(<Select name={'test_box'} options={[]}/>);
    const select        = getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).toMatchInlineSnapshot(`
      <select
        class=""
        name="test_box"
      />
   `);
  });

  test('renders select box with items', function () {
    const { getByRole } = render(<Select name={'test_box'} options={[{ text: 'test item 1', value: 'test_item_1' }]}/>);
    const select        = getByRole('combobox');
    const options       = select.children;

    expect(select.value).toEqual('test_item_1');
    expect(options.length).toBe(1);
    expect(options).toMatchInlineSnapshot(`
        HTMLCollection [
          <option
            class=""
            value="test_item_1"
          >
            test item 1
          </option>,
        ]
    `);
  });

  test('renders select box with items and default selected', function () {
    const { getByRole } = render(
      <Select
        name={'test_box'}
        initValue={'test_item_2'}
        options={[{ text: 'test item 1', value: 'test_item_1' }, { text: 'test item 2', value: 'test_item_2' }]}
      />,
    );
    const select        = getByRole('combobox');
    const options       = select.children;

    expect(select.value).toEqual('test_item_2');
    expect(options.length).toBe(2);
    expect(options).toMatchInlineSnapshot(`
        HTMLCollection [
          <option
            class=""
            value="test_item_1"
          >
            test item 1
          </option>,
          <option
            class=""
            value="test_item_2"
          >
            test item 2
          </option>,
        ]
    `);
  });

  test('select box calls onChange', function () {
    let testVal         = 'test_item_1';
    const handleUpdate  = jest.fn((e) => testVal = e.value);
    const { container } = render(
      <Select
        name={'test_box'}
        initValue={testVal}
        updateEv={handleUpdate}
        options={[{ text: 'test item 1', value: 'test_item_1' }, { text: 'test item 2', value: 'test_item_2' }]}
      />,
    );
    const select = container.firstChild;

    fireEvent.change(select, { target: { value: 'test_item_2' } });

    expect(handleUpdate).toHaveBeenCalledTimes(1);
    expect(handleUpdate).toHaveBeenCalledWith(select);
    expect(testVal).toBe('test_item_2');
  });

});
