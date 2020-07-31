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

import CryptoJS from 'crypto-js';
import React, { useContext, useState } from 'react';

import Block from '../../../components/Page/Block/Block';
import useFormControl from '../../../components/UseFormControl/UseFormControl';

import { ConfigContext } from '../../context/Config';
import PinnedMessage from '../../shared/PinnedMessage/PinnedMessage';
import Quote from '../../shared/Quote/Quote';
import ContentPanel from './content-panel/ContentPanel';
import NotifyPanel from './notify-panel/NotifyPanel';
import PrivacyPanel from './privacy-panel/PrivacyPanel';
import SendFailure from './send-failure/SendFailure';
import SendSuccess from './send-success/SendSuccess';

const Home = () => {
  const { storage, web: webCfg }      = useContext(ConfigContext);
  const [noteId, setNoteId]           = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { form, onUpdateForm, submitForm, resetForm } = useFormControl({
    content:           '',
    passphrase:        '',
    confirmPassphrase: '',
    autoExpire:        'on-read',
    emailRecipient:    '',
    emailSender:       '',
  });

  const submit = (data) => {
    storage.store({
      'content':     CryptoJS.AES.encrypt(data.content, data.passphrase).toString(),
      'auto-expire': data.autoExpire,
      'notify': { 'recipient': data.emailRecipient, 'sender': data.emailSender }
    }).then(function (response) {
      setNoteId(response.data['note-id']);
    }).catch(function (err) {
      setSubmitError(err.message);
    });
  };

  const generateLink = () => {
    return webCfg.domain + '/view-note/' + noteId;
  };

  return (
    <>
      <Block attrs={{ 'data-type': 'content' }}>
        <Quote/>

        <Block classes={['mx-auto', 'w-full md:w-10/12 lg:w-8/12', 'border border-gray-200', 'shadow-sm']}>
          <form action='#' onSubmit={(ev) => submitForm(submit, ev)}>
            <Block classes={['p-3', 'bg-white']}>
              <ContentPanel form={form} changeEv={onUpdateForm}/>
              <PrivacyPanel form={form} changeEv={onUpdateForm}/>
              <NotifyPanel form={form} changeEv={onUpdateForm} />
            </Block>

            <div className="bottom flex bg-gray-100 justify-end px-3 rounded">
              <input type="submit" value="Send"
                     className="my-2 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded font-bold w-2/5 md:w-1/4 right-0"
              />
            </div>
          </form>
        </Block>

        <PinnedMessage>
          <Block classes={['flex flex-col']}>
            <p className="text-sm sm:text-lg md:text-lg lg:text-lg font-bold">
              NOTHING is 100% secure.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-base">
              We strive to take care of your data by only storing it memory and deleting it after it has been viewed once!
            </p>
          </Block>
        </PinnedMessage>

        {(noteId ? <SendSuccess closeHandler={() => {
          resetForm();
          setNoteId(false);
        }} link={generateLink()}/> : <></>)}

        {(submitError ? <SendFailure err={submitError} closeHandler={() => {
          setSubmitError(false);
        }}/> : <></>)}

      </Block>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
