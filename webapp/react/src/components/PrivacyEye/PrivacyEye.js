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

import OffIcon from './OffIcon';
import OnIcon from './OnIcon';

const PrivacyEye = ({ classes, initMode, changeEv }) => {
  const [mode, setMode] = useState(initMode);
  classes = ['absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5', ...classes];

  return (
    <div className={classes} onClick={(e) => { setMode(!mode); changeEv(e); }}>
      {( !mode ? <OffIcon /> : <OnIcon />)}
    </div>
  );
};

PrivacyEye.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  initMode: PropTypes.bool,
  changeEv: PropTypes.func,
};

PrivacyEye.defaultProps = {
  classes: [],
  initMode: false,
  changeEv: () => {},
};

export default PrivacyEye;
