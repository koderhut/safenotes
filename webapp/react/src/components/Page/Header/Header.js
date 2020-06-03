import React from 'react';
import PropType from 'prop-types';

const Header = ({ classes, attrs, children }) => {
  return (
    <header className={classes.join(' ')} {...attrs}>
      {children}
    </header>
  );
};

Header.propTypes = {
  classes:  PropType.array,
  attrs:    PropType.object,
  children: PropType.any,
};

Header.defaultProps = {
  classes:  [],
  attrs:    {},
  children: null,
};

export default Header;
