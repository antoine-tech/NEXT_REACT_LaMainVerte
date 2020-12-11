import { find, create } from "../sevices/Api";
import jwtDecode from "jwt-decode";

// perform a request to sign the user in
const signUserIn = async (email, password, jwt_token) => {
  return await create(
    {
      user: {
        email,
        password,
      },
    },
    "/login",
    false
  );
};

// perform a request to sign the user up
const signUserUp = async (
  first_name,
  last_name,
  username,
  email,
  password,
  password_confirmation
) => {
  return await create(
    {
      user: {
        first_name,
        last_name,
        username,
        email,
        password,
        password_confirmation,
      },
    },
    "/register",
    false
  );
};

const getUserDatas = async (jwt_token) => {
  const userId = jwtDecode(jwt_token);

  return await find(`/users/${userId.sub}`, true, jwt_token);
};

const findUserDatas = async (userId) => {
  return await find(`/users/${userId}`, false)
    .then((res) => res.json())
    .catch((error) => error);
};

export { signUserIn, signUserUp, getUserDatas, findUserDatas };
