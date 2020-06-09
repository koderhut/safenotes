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

import React from "react";

const ContentInput = ({name, placeHolder, readonly, disabled, onChange, content, styles}) => {
    const style = "w-full text-gray-700 leading-tight focus:outline-none " + styles;

    return (
        <>
            <textarea
                id="content"
                name={name}
                className={style}
                rows="10"
                placeholder={placeHolder}
                required
                readOnly={readonly}
                disabled={disabled}
                onChange={(e) => onChange(e.target)}
                value={content}
            />
        </>
    );
};

ContentInput.defaultProps = {
    name:        "content-input",
    placeHolder: "",
    readonly:    false,
    disabled:    false,
    onChange:    () => {
    },
    content:     "",
    styles: "",
};

export default ContentInput;
