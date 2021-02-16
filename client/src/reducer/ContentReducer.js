function ContentReducer(state, action) {
  switch (action.type) {
    case "ADD_IMAGE":
      return action.value;
    default:
      return state;
  }
}

export default ContentReducer;
