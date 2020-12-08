/* ==== EXAMPLE ====
export const action = () => {
  return {
    type: 'ACTION',
  }
}

export const actionWithProps = (props) => {
  return {
    type: 'ANOTHERACTION',
    playload: props
  }
}




==== TO CALL THEM IN ANOTHER COMPONENT ====


const dispatch = useDispatch();
dispatch(action());
dispatch(actionWithProps(props));


*/

const setCurrentUser = (user) => {
  return {
    type: "CURRENT_USER",
    payload: {
      current_user: user,
    },
  };
};


export {setCurrentUser}
