import React, { createContext, useReducer } from "react";
import DropValueReducer from "../reducer/DropValueReducer";
import FormValueReducer from "../reducer/FormValueReducer";
const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [DropValue, DropDispatch] = useReducer(DropValueReducer, {
    Category: null,
    Brand: null,
  });

  const [FormValue, FormDispatch] = useReducer(FormValueReducer, {
    Title: "",
    Pname: "",
    Context: "",
    Content: [],
  });

  const value = {
    state: { DropValue, FormValue },
    dispatches: { DropDispatch, FormDispatch },
  };
  return (
    <FormContext.Provider value={[value.state, value.dispatches]}>
      {children}
    </FormContext.Provider>
  );
};

const FormConsumer = FormContext.Consumer;

export { FormProvider, FormConsumer };

export default FormContext;
