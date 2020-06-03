import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './panel.scss';

import CloseIcon from './CloseIcon';
import OpenIcon from './OpenIcon';

const Panel = ({ closable, defaultOpen, wrapCss, title, titleBarCss, children }) => {
  const [isOpen, updateIsOpen] = useState(closable ? defaultOpen : true);
  const viewPortCss            = (isOpen ? ['open-panel'] : ['closed-panel']);
  titleBarCss                  = ['title-bar', ...titleBarCss];

  // we don't display the panel if there are no children
  if (children === undefined) {
    return null;
  }

  const updatePanel = () => {
    if (!closable) {
      return;
    }

    updateIsOpen(!isOpen);
  };

  const activeButton = () => {
    if (!closable) {
      return <></>;
    }

    if (isOpen) {
      return <CloseIcon/>;
    }

    return <OpenIcon/>;
  };

  return (
    <div className={wrapCss.join(' ')}>
      <div
        className={titleBarCss.join(' ')}
        onClick={updatePanel}
      >
        <span>{title}</span>

        {activeButton()}
      </div>

      <div id="panel-view" className={viewPortCss.join(' ')}>
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  closable:    PropTypes.bool,
  defaultOpen: PropTypes.bool,
  wrapCss:     PropTypes.array,
  title:       PropTypes.string,
  titleBarCss: PropTypes.array,
};

Panel.defaultProps = {
  closable:    false,
  defaultOpen: true,
  wrapCss:     [],
  title:       'Panel',
  titleBarCss: [],
};

export default Panel;
