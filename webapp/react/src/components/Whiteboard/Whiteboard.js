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
