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
import Block from '../../../../components/Page/Block/Block';

const Passphrase = ({ passphrase, confirm, changeEv}) => {
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
  ];

  return (
    <Block classes={['flex', 'flex-col', 'sm:flex-row']}>
      <Block classes={['w-full sm:w-1/2 sm:mr-1']}>
        <SimpleInput
          label={'Passphrase'}
          labelCls={['w-full block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2']}
          type='password'
          placeholder='Passphrase'
          id='passphrase'
          name='passphrase'
          inputCls={inputCls}
          required={true}
          value={passphrase}
          changeEv={(e) => changeEv(e.target)}
        />
      </Block>

      <Block classes={['w-full sm:w-1/2 sm:ml-1']}>
        <SimpleInput
          label={'Confirm Passphrase'}
          labelCls={['w-full block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2']}
          type='password'
          placeholder='Confirm Passphrase'
          id='confirm-passphrase'
          name='confirmPassphrase'
          inputCls={inputCls}
          required={true}
          value={confirm}
          changeEv={(e) => changeEv(e.target)}
        />
      </Block>
    </Block>
  );
};

Passphrase.propTypes = {
  passphrase: PropType.string,
  confirm: PropType.string,
  changeEv: PropType.func,
};

Passphrase.defaultProps = {
  changeEv: () => {},
};

export default Passphrase;
