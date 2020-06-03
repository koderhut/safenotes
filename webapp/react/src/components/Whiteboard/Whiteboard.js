import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Whiteboard = ({ content, wrapCss, children }) => {

  if (children !== undefined) {
    content = children;
  }

  if (typeof content === 'string') {
    content = content.split('\n').map((item, key) => {
      return <Fragment key={key}>{item}<br/></Fragment>;
    });

    content = (<p className={wrapCss.join(' ')}>{content}</p>);
  }

  return (
    <div className={wrapCss.join(' ')}>
      {content}
    </div>
  );
};

Whiteboard.propTypes = {
  content: PropTypes.string.isRequired,
  wrapCss: PropTypes.array,
};

Whiteboard.defaultProps = {
  content: '',
  wrapCss: [],
};

export default Whiteboard;
