import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/actions/";

const useCurrentUser = () => {
  const [isAuth, setIsAuth] = useState(false);

  // disptaching current user to global state/redux store
  const dispatch = useDispatch();

  const { current_user } = useState();

  return {
    setCurrentUser: (user)=>dispatch(setCurrentUser(user)),
    current_user,
    isAuth,
    setIsAuth,
  };
};

export default useCurrentUser;
