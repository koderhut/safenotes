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

import ContentInput from '../../../../components/Form/ContentInput/ContentInput';
import Panel from '../../../../components/Panel/Panel';

const ContentPanel = ({ form, changeEv }) => {
  const panelCls = ['text-base text-blue-400 font-bold border border-gray-300 shadow-sm rounded-sm relative p-2'];
  const contentCls = [
    'shadow-sm hover:shadow focus:shadow-outline',
    'border border-gray-400 hover:border-gray-500',
    'rounded rounded-xs',
    'py-3 px-4 mt-2',
    'bg-gray-100',
    'focus:bg-white focus:outline-none'
  ];

  return (
    <Panel title={'Add Your Sensitive Content'} titleBarCss={panelCls}>
      <ContentInput
        name="content"
        content={form.content}
        onChange={changeEv}
        styles={contentCls.join(' ')}
      />
    </Panel>
  );
};

ContentPanel.propTypes = {};

ContentPanel.defaultProps = {};

export default ContentPanel;
