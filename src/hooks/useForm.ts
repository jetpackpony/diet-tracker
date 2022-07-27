import { useRef, useState } from 'react';

export type InputEventListener = (e: InputEvent) => any;

export interface FormValues {
  [key: string]: string | number
};

export type FormSubmitCallback = (
  values: FormValues | undefined,
  resetForm?: () => void,
  e?: React.FormEvent<HTMLFormElement>
) => any;

export const getFormControls = (form: HTMLFormElement | undefined) => {
  const res: Element[] = [];
  if (!form) return res;
  for (let i = 0; i < form.elements.length; i++) {
    res.push(form.elements[i]);
  }
  return res;
};

const isValueInput = (el: any): el is HTMLInputElement => el.name && el.tagName === "INPUT";
const isInputEvent = (e: Event): e is InputEvent => {
  return (e as InputEvent).data !== undefined;
};

export const useControlledFormHook = (onSubmitCallback: FormSubmitCallback, omit: string[] = []) => {
  const [values, setValues] = useState<FormValues>();
  const prevEventListener = useRef<(e: Event) => any>();
  const formRef = useRef<HTMLFormElement>();
  const omitRef = useRef<string[]>(omit);
  const changeListenersRef = useRef<EventListener[]>([]);

  const handleInputChange = (e: Event) => {
    setValues((formValues) => {
      if (!isValueInput(e.target)) return;
      let { value, name } = e.target;
      if (isInputEvent(e)) {
        if (value === "" && e.data === "-") {
          value = "-";
        }
      }
      return {
        ...formValues,
        [name]: value
      };
    });
    changeListenersRef.current.forEach((listener) => listener(e));
  };

  const initForm = (form: HTMLFormElement) => {
    formRef.current = form;

    if (values === undefined) {
      resetForm();
    } else {
      getFormControls(formRef.current)
        .filter(isValueInput)
        .filter(({ name }) => !omitRef.current.includes(name))
        .forEach((input) => {
          // This check allows us to enter negative numbers in the number inputs
          if (values[input.name] !== undefined && (input.type !== "number" || values[input.name] !== "-")) {
            input.value = values[input.name].toString();
          }
          if (prevEventListener.current !== undefined) {
            input.removeEventListener("input", prevEventListener.current);
          }
          input.addEventListener("input", handleInputChange);
        });
      prevEventListener.current = handleInputChange;
    }
  };

  const resetForm = () => {
    const initValues: FormValues = {};
    const values = getFormControls(formRef.current)
      .filter(isValueInput)
      .filter(({ name }) => !omitRef.current.includes(name))
      .reduce((res, input) => {
        input.disabled = false;
        res[input.name] = input.defaultValue;
        return res;
      }, initValues);
    setValues(values);
  };

  const setDisabled = (inputs: string[]) => {
    getFormControls(formRef.current)
      .filter(isValueInput)
      .filter((input) => inputs.includes(input.name))
      .filter(({ name }) => !omit.includes(name))
      .forEach((input) => {
        input.disabled = true;
      });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitCallback(values, resetForm, e);
  };

  const updateValues = (newValues: FormValues) => (
    setValues((oldValues) => ({
      ...oldValues,
      ...newValues
    }))
  );

  const addOnChangeListener = (listener: EventListener) => {
    changeListenersRef.current = [
      ...changeListenersRef.current,
      listener
    ];
  };

  return {
    initForm,
    onSubmit,
    resetForm,
    updateValues,
    setDisabled,
    addOnChangeListener
  };
};