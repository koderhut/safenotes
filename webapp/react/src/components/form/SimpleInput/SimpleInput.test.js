import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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

  test('render text input with specific onChange handler', function () {
    const handleChange = jest.fn()
    const { getByRole } = render(<SimpleInput name={'test-input'} type={'text'} changeEv={handleChange} />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: 'abcd' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(input)
    expect(input.value).toBe('abcd')
  });

  test('render text input with specific onBlur handler', function () {
    const handleBlur = jest.fn()
    const { getByRole } = render(<SimpleInput name={'test-input'} type={'text'} blurEv={handleBlur} />);
    const input = getByRole("textbox");

    fireEvent.blur(input, { target: input })
    expect(handleBlur).toHaveBeenCalledTimes(1)
    expect(handleBlur).toHaveBeenCalledWith(input)
  });

  test('render text input with specific onFocus handler', function () {
    const handleFocus = jest.fn()
    const { getByRole } = render(<SimpleInput name={'test-input'} type={'text'} focusEv={handleFocus} />);
    const input = getByRole("textbox");

    fireEvent.focus(input, { target: input })
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleFocus).toHaveBeenCalledWith(input)
  });

});
