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
import CryptoJS from 'crypto-js';

import SimpleInput from '../../../../components/Form/SimpleInput/SimpleInput';
import Label from '../../../../components/Label/Label';
import Block from '../../../../components/Page/Block/Block';
import PrivacyEye from '../../../../components/PrivacyEye/PrivacyEye';
import useFormControl from '../../../../components/UseFormControl/UseFormControl';

const DecryptForm = ({ content, onDecryptionSuccess }) => {
  const [inputType, setInputType] = useState('password');
  const { form, onUpdateForm } = useFormControl({ content: content, passphrase: '' });

  function decrypt () {
    if (form.passphrase === '') {
      return; // TODO:add proper error handling
    }

    onDecryptionSuccess(CryptoJS.AES.decrypt(form.content, form.passphrase).toString(CryptoJS.enc.Utf8));
  }

  const privacyMode = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  return (
    <Block classes={['mx-auto flex flex-col text-gray-700 w-full py-2 pt-8']}>
      <Block classes={['flex flex-col']}>
        <Label labelFor={'passphrase'} text={'The note requires a passphrase to unlock:'} classNames={['bg-white-200 mx-auto text-xl lg:text-2xl text-center font-extrabold text-gray-400']} />
        <Block classes={['relative w-full md:w-8/12 mb-4 mx-auto']}>
          <SimpleInput
            name="passphrase"
            inputCls={['p-2 mx-auto w-full shadow-sm border']}
            type={inputType}
            placeholder="Unlock Passphrase"
            changeEv={onUpdateForm}
            value={form.passphrase}
          />

          <PrivacyEye changeEv={(e) => privacyMode()} />
        </Block>

        <input
          className="p-2 bg-blue-400 hover:bg-blue-500 text-white font-bold mx-auto w-full md:w-1/4 rounded"
          type="button"
          onClick={decrypt}
          value="Unlock Note"
        />
      </Block>
    </Block>
  );
};

DecryptForm.propTypes = {
  content: PropTypes.string,
};

export default DecryptForm;
