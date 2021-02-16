import { useCallback, useContext } from "react";
import FormContext from "../context/FormContext";
const useInputs = () => {
  // const [Form, setForm] = useState(initialForm);

  const [state, dispatches] = useContext(FormContext);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    // setForm((Form) => ({ ...Form, [name]: value }));
    dispatches.FormDispatch({
      type: "CHANGE_VALUE",
      value: value,
      name: name,
    });
  }, []);

  const reset = useCallback(() => {
    dispatches.FormDispatch({
      type: "CLEAR_VALUE",
    });
  }, []);
  return [onChange, reset];
};

export default useInputs;
