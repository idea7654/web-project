function RecommendReducer(state, action) {
  switch (action.type) {
    case "SET_GOOD":
      return { ...state, Good: action.value, Id: [...state.Id, action.id] };
    case "SET_GOOD_CANCEL":
      return {
        ...state,
        Good: action.value,
        Id: state.Id.filter((num) => num !== action.id),
      };
    case "SET_BAD":
      return { ...state, Bad: action.value, Id: [...state.Id, action.id] };
    case "SET_BAD_CANCEL":
      return {
        ...state,
        Bad: action.value,
        Id: state.Id.filter((num) => num !== action.id),
      };
    default:
      return state;
  }
}

export default RecommendReducer;
