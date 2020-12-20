const initialState = {
  current_user: null,
  notifications:[]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...initialState, current_user: action.payload.current_user };
      case "NOTIFICATION":
        return {...initialState, notifications: action.payload };
    default:
      return state;
  }
};

export default reducer;
