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

const Loader = ({message}) => {
    return (
        <div
            className="text-xl text-center border py-4 w-full sm:xw-8/12 md:w-10/12 lg:w-8/12 m-10 bg-white font-bold text-gray-500 mx-auto"
        >{message}</div>
    );
};

export default Loader;
