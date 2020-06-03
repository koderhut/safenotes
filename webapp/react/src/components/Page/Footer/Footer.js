import React from 'react';
import PropType from 'prop-types';

const Footer = ({ classes, attrs, children }) => {
  return (
    <footer className={classes.join(' ')} {...attrs}>
      {children}
    </footer>
  );
};

Footer.propTypes = {
  classes:  PropType.array,
  attrs:    PropType.object,
  children: PropType.any,
};

Footer.defaultProps = {
  classes:  [],
  attrs:    {},
  children: null,
};

export default Footer;
