const initialState = {
  current_user: null,
};

const reducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case "CURRENT_USER":
      return { current_user: action.payload };
    default:
      return state;
  }
};

export default reducer;

// ==== TO USE IT FROM ANOTHER COMPONENT ====
// import {useSelector} from 'react-redux';

// const my_reducer = useSelector(state => state.my_reducer);
