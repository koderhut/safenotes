import React from 'react';
import PropTypes from 'prop-types';

import './panel.scss';

const OpenIcon = ({ wrapCss, svgCss }) => {
  const classes = [...['open pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'], ...wrapCss];
  const svgcls  = [...['fill-current h-4 w-4'], ...svgCss];

  return (
    <div className={classes.join(' ')}>
      <svg className={svgcls.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  );
};

OpenIcon.propTypes = {
  wrapCss: PropTypes.array,
  svgCss:  PropTypes.array,
};

OpenIcon.defaultProps = {
  wrapCss: [],
  svgCss:  [],
};


export default OpenIcon;
