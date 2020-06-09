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

const OpenIcon = ({ wrapCss, svgCss }) => {
  const classes = [...['open pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'], ...wrapCss];
  const svgcls  = [...['fill-current h-4 w-4'], ...svgCss];

  return (
    <div className={classes.join(' ')}>
      <svg className={svgcls.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  );
};

OpenIcon.propTypes = {
  wrapCss: PropTypes.array,
  svgCss:  PropTypes.array,
};

OpenIcon.defaultProps = {
  wrapCss: [],
  svgCss:  [],
};


export default OpenIcon;
