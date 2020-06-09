/*
 * Copyright (c) 2020. Denis Rendler <connect@rendler.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './panel.scss';

import CloseIcon from './CloseIcon';
import OpenIcon from './OpenIcon';

const Panel = ({ closable, defaultOpen, wrapCss, viewPortCss, title, titleBarCss, children }) => {
  const [isOpen, updateIsOpen] = useState(closable ? defaultOpen : true);
  const viewPortCls            = (isOpen ? [...viewPortCss, 'open-panel'] : [...viewPortCss, 'closed-panel']);
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

      <div id="panel-view" className={viewPortCls.join(' ')}>
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  closable:    PropTypes.bool,
  defaultOpen: PropTypes.bool,
  wrapCss:     PropTypes.array,
  viewPortCss: PropTypes.array,
  title:       PropTypes.string,
  titleBarCss: PropTypes.array,
};

Panel.defaultProps = {
  closable:    false,
  defaultOpen: true,
  wrapCss:     [],
  viewPortCss: [],
  title:       'Panel',
  titleBarCss: [],
};

export default Panel;
