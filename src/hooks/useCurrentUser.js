import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/actions/";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  const current_user = useSelector(state=>state.current_user);

  return {
    setCurrentUser: (user)=>dispatch(setCurrentUser(user)),
    current_user
  };
};

export default useCurrentUser;
