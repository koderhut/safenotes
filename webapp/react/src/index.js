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
import ReactDOM from 'react-dom';

import { config, ConfigContext } from './SafeNotes/context/Config';
import StorageEngine from './lib/StorageEngine';
import SafeNotes from './SafeNotes';

let AppConfig = {
  ...config,
  ...window.snenv,
  storage: new StorageEngine(window.snenv.web.storage_path),
};

ReactDOM.render(
  <React.StrictMode>
    <ConfigContext.Provider value={AppConfig}>
      <SafeNotes/>
    </ConfigContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
