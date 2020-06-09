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
