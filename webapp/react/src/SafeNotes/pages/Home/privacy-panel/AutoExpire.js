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

import Select from '../../../../components/Form/Select/Select';
import Label from '../../../../components/Label/Label';
import Block from '../../../../components/Page/Block/Block';

const AutoExpire = ({ options, selected, onChange }) => {
  const selectCls = [
    'w-full',
    'block',
    'appearance-none',
    'text-gray-600',
    'bg-gray-100',
    'border border-gray-400 hover:border-gray-500',
    'px-4 py-2 pr-8',
    'rounded',
    'hover:shadow focus:shadow-outline',
    'leading-tight',
    'focus:outline-none',
  ];
  const labelCls = ['block uppercase tracking-wide text-xs text-gray-500 font-bold mb-1 mt-2'];

  return (
    <>
      <Label classNames={labelCls}>
        <span className="hidden sm:inline">Automatically</span> expire after:
      </Label>

      <Block classes={["relative"]}>
        <Select name={'autoExpire'} initValue={selected} options={options} updateEv={onChange} selectCls={selectCls}/>

        <Block classes={['pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700']}>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </Block>
      </Block>
    </>
  );
};

AutoExpire.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  options:  PropTypes.arrayOf(
    PropTypes.shape({
      text:     PropTypes.string.isRequired,
      value:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

AutoExpire.defaultProps = {
  selected: '',
  onChange: () => {},
  options:  [],
};

export default AutoExpire;
