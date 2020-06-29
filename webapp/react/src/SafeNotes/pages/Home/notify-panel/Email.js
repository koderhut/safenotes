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

import SimpleInput from '../../../../components/Form/SimpleInput/SimpleInput';
import Label from '../../../../components/Label/Label';
import Block from '../../../../components/Page/Block/Block';

const Email = ({ email, name, labelText, changeEv, placeholder, wrapCss}) => {
  const inputCls        = [
    'my-1',
    'shadow-sm hover:shadow focus:shadow-outline',
    'rounded-sm',
    'bg-gray-100',
    'text-gray-700',
    'border border-gray-400 hover:border-gray-500',
    'py-2 px-3',
    'leading-tight',
    'focus:outline-none',
    'focus:bg-white',
    'w-full',
    'relative'
  ];

  return (
      <Block classes={['w-full sm:w-2/3 block uppercase tracking-wide text-gray-500 font-bold relative', ...wrapCss]}>
        <Label labelFor={name} text={labelText} classNames={['w-full block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2 block']} />

        <Block classes={['relative']} >
          <SimpleInput
            type="email"
            placeholder={placeholder}
            id={name}
            name={name}
            inputCls={inputCls}
            required={false}
            value={email}
            changeEv={changeEv}
          />
        </Block>
      </Block>
  );
};

Email.propTypes = {

  changeEv: PropType.func,
};

Email.defaultProps = {
  changeEv: () => {},
  placeholder: 'Email address',
  wrapCss: [],
};

export default Email;
