import React from 'react'
import PropTypes from 'prop-types'
import Label from '../../label/Label'

const SimpleInput = ({
  label,
  labelCls,
  id,
  name,
  type,
  inputCls,
  defaultValue,
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
}) => {

  const inputClsNames = inputCls.join(" ")

  return (
    <>
      {(label !== '') ? <Label classNames={labelCls} text={label} labelFor={id} /> : ''}
      <input id={id}
             name={name}
             type={type}
             className={inputClsNames}
             defaultValue={defaultValue}
             defaultChecked={defaultValue}
             onChange={(e) => changeEv(e.target)}
             onBlur={(e) => blurEv(e.target)}
             onFocus={(e) => focusEv(e.target)}
             placeholder={placeholder}
             required={required}
             disabled={disabled}
             min={min}
             max={max}
             minLength={minLength}
             maxLength={maxLength}
             pattern={pattern}
             step={step}
      />
    </>
  )
}

SimpleInput.propTypes = {
  label:        PropTypes.string,
  labelCls:     PropTypes.array,
  id:           PropTypes.string,
  name:         PropTypes.string.isRequired,
  type:         PropTypes.oneOf(['text', 'email', 'password', 'tel', 'number']).isRequired,
  inputCls:     PropTypes.array,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeEv:     PropTypes.func,
  blurEv:       PropTypes.func,
  focusEv:      PropTypes.func,
  placeholder:  PropTypes.string,
  disabled:     PropTypes.bool,
  required:     PropTypes.bool,
  min:          PropTypes.number,
  max:          PropTypes.number,
  minLength:    PropTypes.number,
  maxLength:    PropTypes.number,
  pattern:      PropTypes.string,
  step:         PropTypes.number,
  color:        PropTypes.oneOf(
    ['primary', 'info', 'success', 'warning', 'danger']),
}

SimpleInput.defaultProps = {
  label:        '',
  labelCls:     [],
  id:           'input',
  name:         'input',
  type:         'text',
  inputCls:     ['input'],
  defaultValue: '',
  changeEv:     () => {
  },
  blurEv:       () => {
  },
  focusEv:      () => {
  },
  placeholder:  '',
  disabled:     false,
  required:     false,
  min:          0,
  max:          0,
  minLength:    0,
  maxLength:    0,
  pattern:      '',
  step:         0,
  color:        'primary',
}

export default SimpleInput
