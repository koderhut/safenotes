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

const ErrorIcon = ({ wrapCls }) => {
  return (
    <span className={wrapCls}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 455.431 455.431" style={{ enableBackground: 'new 0 0 455.431 455.431' }}>
            <path style={{ fill: '#ff0000' }} d="M405.493,412.764c-69.689,56.889-287.289,56.889-355.556,0c-69.689-56.889-62.578-300.089,0-364.089
                s292.978-64,355.556,0S475.182,355.876,405.493,412.764z"/>
            <g style={{ opacity: '0.2' }}>
                <path style={{ fill: '#FFFFFF' }} d="M229.138,313.209c-62.578,49.778-132.267,75.378-197.689,76.8
                    c-48.356-82.489-38.4-283.022,18.489-341.333c51.2-52.622,211.911-62.578,304.356-29.867
                    C377.049,112.676,330.116,232.142,229.138,313.209z"/>
            </g>
            <path style={{ fill: '#FFFFFF' }} d="M335.804,335.964c-8.533,8.533-22.756,8.533-32.711,0l-75.378-75.378l-75.378,75.378
                c-8.533,8.533-24.178,8.533-32.711,0c-8.533-8.533-8.533-24.178,0-32.711l76.8-75.378l-76.8-75.378
                c-8.533-8.533-8.533-22.756,0-32.711c8.533-8.533,24.178-8.533,32.711,0l75.378,76.8l75.378-76.8c8.533-8.533,22.756-8.533,32.711,0
                c8.533,8.533,8.533,24.178,0,32.711l-75.378,75.378l75.378,75.378C345.76,313.209,345.76,327.431,335.804,335.964z"/>
        </svg>
    </span>
  );
};

ErrorIcon.propTypes = {};

ErrorIcon.defaultProps = {};

export default ErrorIcon;
