const initialState = {
  token: "",
  user: "",
};
function UserReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...{ token: action.token, user: action.user } };
    case "LOGOUT":
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default UserReducer;
