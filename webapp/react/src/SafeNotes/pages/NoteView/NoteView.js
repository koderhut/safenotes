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

import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Block from '../../../components/Page/Block/Block';
import ContentInput from '../../../components/Form/ContentInput/ContentInput';
import Panel from '../../../components/Panel/Panel';
import Whiteboard from '../../../components/Whiteboard/Whiteboard';

import { ConfigContext } from '../../context/Config';
import DecryptForm from './decrypt-form/DecryptForm';
import Loader from '../../shared/Loader/Loader';
import PinnedMessage from '../../shared/PinnedMessage/PinnedMessage';
import Quote from '../../shared/Quote/Quote';
import FetchFailed from './fetch-failed/FetchFailed';

const NoteView = () => {
  const { noteId }                      = useParams();
  const router                          = useHistory();
  const { storage }                     = useContext(ConfigContext);
  const [errFetch, setFetchedError]     = useState(false);
  const [lockedNote, setLockedNote]     = useState('');
  const [unlockedNote, setUnlockedNote] = useState('');

  useEffect(() => {
    storage
      .fetch(noteId)
      .then(function (resource) {
        setLockedNote(resource.payload);
      })
      .catch(function (err) {
        console.log(err);
        setFetchedError(err);
      });
  }, [noteId, storage]);

  const onNoteUnlocked = (content) => {
    if (content === '') {
      setUnlockedNote('The Passphrase Entered Was Wrong! Reload The Page And Try Again.');
      return;
    }

    setUnlockedNote(content);
  };

  const displayContent = () => {
    if (unlockedNote !== '') {
      return (
        <Whiteboard wrapCss={['pt-4 bg-white w-full xmd:w-5/6 xlg:w-4/6 mx-auto flex flex-col text-gray-700 min-h-10']}>
          <ContentInput content={unlockedNote} readonly={true}/>
        </Whiteboard>
      );
    }

    if (lockedNote !== '' && !errFetch) {
      return (<DecryptForm content={lockedNote} onDecryptionSuccess={onNoteUnlocked}/>);

    }

    if (errFetch !== false) {
      return (<FetchFailed closeHandler={() => router.push('/')}/>);
    }

    return <></>;
  };

  const loader = () => {
    return lockedNote === '' && !errFetch ? <Loader message="Fetching note..."/> : null;
  };

  return (
    <Block id="wrapper" classes={['note-view', 'flex flex-col', 'mx-2']}>
      <Quote/>

      {loader()}

      <Panel title={'Note contents'} wrapCss={['flex flex-col w-full md:w-10/12 lg:w-8/12 mx-auto border border-gray-200 shadow-sm px-2 my-4 bg-white']}
        titleBarCss={['text-xl text-gray-500 capitalize tracking-wide py-1 font-bold border-b-2']}
      >
        <Block classes={['flex flex-col min-h-10']}>
          {displayContent()}
        </Block>
      </Panel>

      <PinnedMessage>
        <Block classes={['flex', 'flex-col']}>
          <p className="text-sm sm:text-lg md:text-lg lg:text-lg font-bold">WARNING!</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-bas">Please make sure you save this note in a safe place before leaving the page.
            <br/> Your secret has been <strong>DELETED</strong> from our storage and cannot be recovered!
          </p>
        </Block>
      </PinnedMessage>
    </Block>
  );
};

export default NoteView;
