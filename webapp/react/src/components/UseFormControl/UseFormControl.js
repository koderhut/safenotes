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
