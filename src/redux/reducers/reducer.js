const initialState = {
  current_user: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { current_user: action.payload };
    default:
      return state;
  }
};

export default reducer;
