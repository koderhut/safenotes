import React from 'react';
import PropTypes from 'prop-types';

import Label from '../../Label/Label';

const SimpleInput = ({
  label,
  labelCls,
  id,
  name,
  type,
  inputCls,
  value,
  changeEv,
  blurEv,
  focusEv,
  placeholder,
  required,
  disabled,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  step,
  attrs,
}) => {

  const inputClsNames = inputCls.join(' ');
  let extraArgs       = {};

  [min, max, minLength, maxLength, pattern, step].map((val, index, extraAttrs) => {
    if (val === undefined) {
      return extraArgs;
    }

    return extraArgs[index] = val;
  });

  return (
    <>
      {(label !== '') ? <Label classNames={labelCls} text={label} labelFor={id}/> : ''}
      <input id={id}
             name={name}
             type={type}
             className={inputClsNames}
             value={value}
             onChange={(e) => changeEv(e.target)}
             onBlur={(e) => blurEv(e.target)}
             onFocus={(e) => focusEv(e.target)}
             placeholder={placeholder}
             required={required}
             disabled={disabled}
             {...extraArgs}
             {...attrs}
      />
    </>
  );
};

SimpleInput.propTypes = {
  label:       PropTypes.string,
  labelCls:    PropTypes.array,
  id:          PropTypes.string,
  name:        PropTypes.string.isRequired,
  type:        PropTypes.oneOf(['text', 'email', 'password', 'tel', 'number']).isRequired,
  inputCls:    PropTypes.array,
  ctrlValue:   PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeEv:    PropTypes.func,
  blurEv:      PropTypes.func,
  focusEv:     PropTypes.func,
  placeholder: PropTypes.string,
  disabled:    PropTypes.bool,
  required:    PropTypes.bool,
  min:         PropTypes.number,
  max:         PropTypes.number,
  minLength:   PropTypes.number,
  maxLength:   PropTypes.number,
  pattern:     PropTypes.string,
  step:        PropTypes.number,
  attrs:       PropTypes.object,
  color:       PropTypes.oneOf(
    ['primary', 'info', 'success', 'warning', 'danger']),
};

SimpleInput.defaultProps = {
  label:       '',
  labelCls:    [],
  id:          'input',
  name:        'input',
  type:        'text',
  inputCls:    ['input'],
  ctrlValue:   '',
  changeEv:    () => {
  },
  blurEv:      () => {
  },
  focusEv:     () => {
  },
  placeholder: '',
  disabled:    false,
  required:    false,
  color:       'primary',
  attrs:       {},
};

export default SimpleInput;
