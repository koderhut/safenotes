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

const PinnedMessage = ({ type, children }) => {
  const messageType = (type) => {
    switch (type) {
      case 'info':
        return ' bg-blue-100 border-blue-500 text-blue-700';
      case 'error':
        return ' bg-red-100 border-red-500 text-red-700';
      default:
        return '';
    }
  };

  const wrapperClass = (type = 'info') => {
    const classAttr = 'pinned flex items-center border-t border-b px-1 py-1 mx-auto my-3  shadow-sm w-full md:w-10/12 lg:w-8/12 ';

    return classAttr + messageType(type);
  };

  return (
    <div className={wrapperClass(type)} role="alert">
      <svg className="fill-current w-20 h-20 sm:w-16 sm:h-16 md:w-10 md:h-10 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
      </svg>
      {children}
    </div>
  );
};

export default PinnedMessage;
