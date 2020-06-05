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
import CopyToClipboard from 'react-copy-to-clipboard';

import Block from '../../../../components/Page/Block/Block';
import Panel from '../../../../components/Panel/Panel';

import ModalMessage from '../../../shared/ModalMessage/ModalMessage';
import SuccessIcon from './SuccessIcon';

const SendSuccess = ({ link, closeHandler }) => {

  return (
    <ModalMessage reset={closeHandler}>
      <Panel title="Success"
             titleBarCss={['text-xl text-gray-500 font-bold border-b-2 border-gray-400 mb-4']}
      >
        <Block classes={['flex flex-wrap']}>
          <span className={'icon w-2/12 md:w-1/12'}>
            <SuccessIcon/>
          </span>
          <Block classes={['message w-10/12 p-3']}>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">We've generated a link to your note:</p>
            <p className="text-sm sm:text-base text-blue-500 underline">{link}</p>
          </Block>
        </Block>
      </Panel>

      <Block classes={['flex flex-col sm:flex-row w-full']}>
        <CopyToClipboard text={link}>
          <button className={'my-4 mx-auto sm:w-1/3 p-2 bg-green-400 hover:bg-green-500 text-white rounded font-extrabold w-3/4 capitalize'}
          >Copy to clipboard
          </button>
        </CopyToClipboard>
        <button className={'my-4 mx-auto sm:w-1/3 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded font-extrabold w-3/4 capitalize'}
                onClick={closeHandler}
        >Prepare a new note
        </button>
      </Block>
    </ModalMessage>
  );
};

SendSuccess.defaultProps = {
  closeHandler: () => {
  },
  link:         '',
};

export default SendSuccess;
