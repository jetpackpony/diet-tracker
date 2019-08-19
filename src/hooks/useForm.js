import { useRef } from 'react';

const getFormControls = (form) => {
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

const useFormHook = (callback) => {
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

export default useFormHook;