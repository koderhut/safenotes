import { fireEvent, render } from '@testing-library/react';
import React from 'react';

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
