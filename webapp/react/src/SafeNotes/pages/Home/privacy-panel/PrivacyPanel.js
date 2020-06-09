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

import React, { useContext } from 'react';
import PropType from 'prop-types';

import Panel from '../../../../components/Panel/Panel';

import { ConfigContext } from '../../../context/Config';
import AutoExpire from './AutoExpire';
import Passphrase from './Passphrase';

const PrivacyPanel = ({ form, changeEv }) => {
  const { web: webCfg } = useContext(ConfigContext);

  return (
    <Panel title={'Privacy'} wrapCss={['my-4']} viewPortCss={['flex flex-col sm:flex-row']} titleBarCss={['text-base text-blue-400 font-bold pl-2 border border-gray-300 shadow-sm rounded-sm relative p-2']}>
      <Passphrase passphrase={form.passphrase} confirm={form.confirmPassphrase} changeEv={changeEv}/>

      <AutoExpire options={webCfg.expirationOptions} selected={form.autoExpire} onChange={changeEv}/>
    </Panel>
  );
};

PrivacyPanel.propTypes = {
  form:     PropType.object,
  changeEv: PropType.func,
};

PrivacyPanel.defaultProps = {};

export default PrivacyPanel;
