import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ name, selectCls, childCls, initValue, updateEv, options }) => {

  options = options.map((opt, index) => {
    return <option key={index} value={opt.value} className={childCls.join(' ')}>{opt.text}</option>;
  });

  return (
    <select
      name={name}
      className={selectCls.join(' ')}
      value={initValue}
      onChange={(e) => updateEv(e.target)}
    >
      {options}
    </select>
  );
};

Select.propTypes = {
  name:         PropTypes.string.isRequired,
  selectCls:    PropTypes.array,
  childCls:     PropTypes.array,
  initValue:    PropTypes.string,
  updateEv:     PropTypes.func,
  options:      PropTypes.arrayOf(
    PropTypes.shape({
      text:     PropTypes.string.isRequired,
      value:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

Select.defaultProps = {
  selectCls: [],
  childCls: [],
  initValue: '',
  updateEv: () => {},
  options: [],
};

export default Select;
