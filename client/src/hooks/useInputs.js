import { useState, useCallback } from "react";

const useInputs = (initialForm) => {
  const [Form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((Form) => ({ ...Form, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);
  return [Form, onChange, reset];
};

export default useInputs;
