const initialState = {
  Title: "",
  Pname: "",
  Context: "",
  Content: [],
};
function FormValueReducer(state, action) {
  switch (action.type) {
    case "CHANGE_VALUE":
      return { ...state, [action.name]: action.value };
    case "UPDATE_VALUE":
      return { ...state, ...action.value };
    case "CLEAR_VALUE":
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default FormValueReducer;
