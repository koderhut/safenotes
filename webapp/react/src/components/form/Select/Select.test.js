import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Select from './Select';

describe('it renders select box', () => {

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
          />,
        ]
    `);
  });

  test('renders select box with items and default selected', function () {
    const { getByRole } = render(
      <Select
        name={'test_box'}
        baseValue={'test_item_2'}
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
          />,
          <option
            class=""
            selected=""
            value="test_item_2"
          />,
        ]
    `);
  });

  test('select box calls onChange', function () {
    const handleUpdate  = jest.fn();
    const { container } = render(
      <Select
        name={'test_box'}
        updateEv={handleUpdate}
        options={[{ text: 'test item 1', value: 'test_item_1' }, { text: 'test item 2', value: 'test_item_2' }]}
      />,
    );
    const select        = container.firstChild;
    const options       = select.children;

    fireEvent.change(select, { target: { value: 'test_item_2' } });

    expect(handleUpdate).toHaveBeenCalledTimes(1);
    expect(handleUpdate).toHaveBeenCalledWith(select);
    expect(select.value).toBe('test_item_2');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
  });

});
