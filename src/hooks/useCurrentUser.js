import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/actions/";

const useCurrentUser = () => {

  // disptaching current user to global state/redux store
  const dispatch = useDispatch();

  const current_user = useSelector(state=>state.current_user);

  return {
    setCurrentUser: (user)=>dispatch(setCurrentUser(user)),
    current_user
  };
};

export default useCurrentUser;
