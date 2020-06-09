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
