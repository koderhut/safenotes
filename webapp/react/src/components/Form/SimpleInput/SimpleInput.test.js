import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import SimpleInput from './SimpleInput';

describe('SimpleInput', () => {

  test('renders text input', () => {
    const { getByRole } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'}/>);
    const inputBox      = getByRole('textbox');

    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toMatchInlineSnapshot(`
      <input
        class="test-input"
        id="input"
        name="test-input"
        placeholder=""
        type="text"
        value=""
      />
   `);
  });

  test('renders text input with label', () => {
    const { getByRole, getByText } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'} id={'test-id'} label={'test label'} labelCls={['label-cls', 'test-cls']}/>);
    const inputBox                 = getByRole('textbox');

    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toMatchInlineSnapshot(`
      <input
        class="test-input"
        id="test-id"
        name="test-input"
        placeholder=""
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
    const { getByRole } = render(<SimpleInput name={'test-input'} inputCls={['test-input']} type={'text'} value={'test value'}/>);
    const input         = getByRole('textbox');

    expect(input.value).toEqual('test value');
  });

  test('render text input with specific onChange handler', function () {
    // let val = '';
    // const handleChange    = jest.fn((e) => {
    //   console.log( e.target.value);
    //   val = e.target.value;
    // });
    // const { getByTestId } = render(<SimpleInput name={'test-input'} ctrlValue={val} type={'text'} changeEv={handleChange} attrs={{ 'data-testid': 'onchange' }}/>);
    // const input           = getByTestId('onchange');
    //
    // fireEvent.change(input, { target: { value: 'abcd' } });
    // expect(handleChange).toHaveBeenCalledTimes(1);
    // // expect(handleChange).toHaveBeenCalledWith(input);
    // expect(input.value).toBe('abcd');
  });

  test('render text input with specific onBlur handler', function () {
    const handleBlur    = jest.fn();
    const { getByRole } = render(<SimpleInput name={'test-input'} type={'text'} blurEv={handleBlur}/>);
    const input         = getByRole('textbox');

    fireEvent.blur(input, { target: input });
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledWith(input);
  });

  test('render text input with specific onFocus handler', function () {
    const handleFocus   = jest.fn();
    const { getByRole } = render(<SimpleInput name={'test-input'} type={'text'} focusEv={handleFocus}/>);
    const input         = getByRole('textbox');

    fireEvent.focus(input, { target: input });
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleFocus).toHaveBeenCalledWith(input);
  });

});
