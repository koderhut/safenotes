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

import { useState } from 'react';

const useFormControl = (initForm) => {
  const [formObj, updateForm] = useState({ ...initForm });

  const onFormUpdate = (data) => {
    updateForm({ ...formObj, [data.name]: data.value });
  };

  const resetForm = () => {
    updateForm({ ...initForm });
  };

  const submit = (callback, event, reset = false) => {
    event.preventDefault(); //always prevent page refresh

    callback(formObj);

    if (reset) resetForm();
  }

  return {
    form:         formObj,
    onUpdateForm: onFormUpdate,
    resetForm:  resetForm,
    submitForm: submit,
  };
};

export default useFormControl;
