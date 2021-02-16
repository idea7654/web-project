function DropValueReducer(state, action) {
  switch (action.type) {
    case "CHANGE_VALUE":
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
}

export default DropValueReducer;
