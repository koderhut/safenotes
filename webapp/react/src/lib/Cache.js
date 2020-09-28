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

export default class Cache {
    static #CACHE_KEY_PREFIX = "sn::";

    fetch (key, defaultReturn) {
       let keyName = Cache.#CACHE_KEY_PREFIX + key;
       let itemData = window.sessionStorage.getItem(keyName);

       if (null === itemData) {
         return defaultReturn;
       }

       return JSON.parse(itemData);
    }

    store (key, payload) {
      let keyName = Cache.#CACHE_KEY_PREFIX + key;

      window.sessionStorage.setItem(keyName, JSON.stringify({
          payload: payload
      }));
    }
}

