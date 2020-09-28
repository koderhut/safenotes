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

import Axios from "axios";
import Cache from "./Cache";

class StorageEngine {
    static #ROUTE_NOTES = "/notes";

    client = "";
    cache = new Cache();

    constructor(storagePath) {
        this.client = Axios.create({
            baseURL: storagePath,
            timeout: 1000,
            headers: {"X-App": "SafeNotes"},
        });
    }

    store(params) {
        return this.client.post(StorageEngine.#ROUTE_NOTES, {}, {
            data: params,
        });
    }

    fetch(path, params = {}) {
        return new Promise((resolve, reject) => {
            let cached = this.cache.fetch(path, false);

            if (false === cached) {
                this.client.get(StorageEngine.#ROUTE_NOTES + "/" + path, {...params})
                    .then((response) => {
                      this.cache.store(path, response.data['content']);

                      resolve(this.cache.fetch(path, false));
                    })
                    .catch((err) => reject(err))
                ;

                return;
            }

            resolve(cached);
        });
    }
}

export default StorageEngine;
