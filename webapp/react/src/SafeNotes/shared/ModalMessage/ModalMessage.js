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

import './styles.css';

const ModalMessage = ({ rootEl, reset, children }) => {
  const modalRoot = rootEl || document.getElementById('modal-message-root');

  const content = <>
    <div className="flex flex-wrap items-center fixed pin bg-semi-75">
      <div className="flex-1 self-end md:px-10 ">
        <div className="bg-white mx-auto w-full sm:w-10/12 lg:w-6/12 border shadow-sm relative p-3 rounded-sm ">
          <span className="absolute top-0 right-0 p-2 z-50">
              <svg className="h-6 w-6 fill-current text-grey hover:text-grey-darkest" role="button" onClick={reset} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
          </span>

          {children}
        </div>
      </div>
    </div>
  </>;

  return ReactDOM.createPortal(content, modalRoot);
};

export default ModalMessage;
