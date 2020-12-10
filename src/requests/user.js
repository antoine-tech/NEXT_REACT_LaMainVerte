import useJwtToken from "../hooks/useJwtToken";
import API from "../sevices/index";
import jwtDecode from "jwt-decode";

// perform a request to sign the user in
const signUserIn = async (email, password, jwt_token) => {
  const response = await API.create(
    {
      user: {
        email,
        password,
      },
    },
    "/login",
    false
  );

  return response;
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
  const response = await API.create(
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

  return response;
};

const getUserDatas = async (jwt_token) => {
  const userId = jwtDecode(jwt_token);

  const response = await API.find(`/users/${userId.sub}`, true, jwt_token);

  return response;
};

const findUserDatas = async (userId) => {
  const response = await API.find(`/users/${userId}`, false)
    .then((res) => res.json())
    .catch((error) => error);

  return response;
};

export { signUserIn, signUserUp, getUserDatas, findUserDatas };
