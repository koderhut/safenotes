import React from 'react';
import PropTypes from 'prop-types';

import './panel.scss';

const CloseIcon = ({ wrapCss, svgCss }) => {
  const classes = [...['closed pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'], ...wrapCss];
  const svgcls = [...['fill-current h-4 w-4'], ...svgCss];

  return (
    <div className={classes.join(' ')}>
      <svg className={svgcls.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
      </svg>
    </div>
  );
};

CloseIcon.propTypes = {
  wrapCss: PropTypes.array,
  svgCss:  PropTypes.array,
};

CloseIcon.defaultProps = {
  wrapCss: [],
  svgCss:  [],
};

export default CloseIcon;
