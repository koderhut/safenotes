import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ classes, attrs, children }) => {

  return (
    <div className={classes.join(' ')} {...attrs}>
      {children != null ? children : <p>This is an empty block!</p>}
    </div>
  );
};

Block.propTypes = {
  classes:  PropTypes.array,
  attrs:    PropTypes.object,
  children: PropTypes.any,
};

Block.defaultProps = {
  classes:  [],
  attrs:    {},
  children: null,
};

export default Block;
