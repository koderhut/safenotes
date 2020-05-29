import React from 'react';
import { render } from '@testing-library/react';

import SimpleInput from './SimpleInput';

describe('it renders an input text box', () => {

  test('renders text input', () => {
    const { getByRole } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'}/>);
    const inputBox = getByRole('textbox');

    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toMatchInlineSnapshot(`
      <input
        class="test-input"
        id="input"
        max="0"
        maxlength="0"
        min="0"
        minlength="0"
        name="test-input"
        pattern=""
        placeholder=""
        step="0"
        type="text"
        value=""
      />
   `);
  });

  test('renders text input with label', () => {
    const { getByRole, getByText } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'} id={'test-id'} label={'test label'} labelCls={['label-cls', 'test-cls']}/>);
    const inputBox = getByRole('textbox');

    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toMatchInlineSnapshot(`
      <input
        class="test-input"
        id="test-id"
        max="0"
        maxlength="0"
        min="0"
        minlength="0"
        name="test-input"
        pattern=""
        placeholder=""
        step="0"
        type="text"
        value=""
      />
    `);

    const label = getByText('test label');

    expect(label).toBeInTheDocument();
    expect(label).toMatchInlineSnapshot(`
      <label
        class="label-cls test-cls"
        for="test-id"
      >
        test label
      </label>
    `);
  });

  test('render text input with default value', function () {
    const { getByRole } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'} defaultValue={'test value'} />);
    const input = getByRole("textbox");

    expect(input.value).toEqual('test value');
  });

});


