import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ classes, attrs, children }) => {

  return (
    <div className={classes.join(' ')} {...attrs}>
      {children != null ? children : <p>This is an empty layout!</p>}
    </div>
  );
};

Layout.propTypes = {
  classes:  PropTypes.array,
  attrs:    PropTypes.object,
  children: PropTypes.any,
};

Layout.defaultProps = {
  classes:  [],
  attrs:    {},
  children: null,
};

export default Layout;
