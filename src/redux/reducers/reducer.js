const initialState = {
  current_user: null,
  notifications:[]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, current_user: action.payload.current_user };
      case "NOTIFICATION":
        return {...state, notifications: action.payload };
    default:
      return state;
  }
};

export default reducer;
