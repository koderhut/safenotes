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

import Panel from '../../../../components/Panel/Panel';
import Email from './Email';

const NotifyPanel = ({ form, changeEv }) => {

  return (
    <Panel title={'Notification'}
           wrapCss={['my-4 mt-7']}
           viewPortCss={['flex flex-col sm:flex-row']}
           titleBarCss={['text-base text-blue-400 font-bold pl-2 border border-blue-200 shadow-sm rounded-sm relative p-2']}
           closable={true}
           defaultOpen={true}
    >
      <Email name={"emailRecipient"} labelText="Recipient E-mail" placeholder="Recipient E-mail" changeEv={changeEv} email={form.emailRecipient} wrapCss={['sm:mr-1']} />
      <Email name={"emailSender"} labelText="Notify Me On E-mail After Open" placeholder="Open Notification E-mail" changeEv={changeEv} email={form.emailSender} />
    </Panel>
  );
};

NotifyPanel.propTypes = {
  form:     PropType.object,
  changeEv: PropType.func,
};

NotifyPanel.defaultProps = {};

export default NotifyPanel;
