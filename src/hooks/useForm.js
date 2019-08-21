import { useRef, useState } from 'react';

export const getFormControls = (form) => {
  const res = [];
  for(let i = 0; i < form.elements.length; i++) {
    res.push(form.elements[i]);
  }
  return res;
};

const getInputsValues = (inputs) => {
  return inputs.reduce((res, input) => {
    if (input.nodeName !== "INPUT") {
      return res;
    }
    const val = input.value;
    res[input.name] = input.type === "number" ? Number(val) : val;
    return res;
  }, {});
};

export const useUncontrolledFormHook = (callback) => {
  const formElement = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const values = getInputsValues(
      getFormControls(formElement.current)
    );
    callback(values, e);
  };

  const initForm = (form) => {
    formElement.current = form;
  };

  return {
    onSubmit, initForm
  };
};

export const useControlledFormHook = (onSubmitCallback) => {
  const [values, setValues] = useState({});
  const prevEventListener = useRef(null);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { value, name, type } = e.target;
    setValues((newValues) => ({
      ...newValues,
      [name]: type === "number" ? Number(value) : value
    }))
  };

  const initForm = (form) => {
    if (!form) return;
    formRef.current = form;

    getFormControls(form).forEach((input) => {
      input.value = values[input.name] || input.defaultValue;
      input.removeEventListener("input", prevEventListener.current);
      input.addEventListener("input", handleInputChange);
    });

    prevEventListener.current = handleInputChange;
  };

  const resetForm = () => {
    setValues((values) => {
      return getFormControls(formRef.current).reduce((res, input) => {
        res[input.name] = input.defaultValue;
        return res;
      }, {});
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitCallback(values, resetForm, e);
  };

  return {
    initForm,
    onSubmit,
    resetForm
  };
};