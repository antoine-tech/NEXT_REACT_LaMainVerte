import { find, create, deletion, update } from "../sevices/Api";
import jwtDecode from "jwt-decode";

const signUserIn = async (email, password, jwt_token) =>
  await create(
    {
      user: {
        email,
        password,
      },
    },
    "/login",
    false
  );

const signUserUp = async (
  first_name,
  last_name,
  username,
  email,
  password,
  password_confirmation
) =>
  await create(
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

const editUserProfile = async (
  first_name,
  last_name,
  username,
  email,
  password,
  password_confirmation,
  user_id,
  jwtToken
) => 
  await update(
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
    `/users/${user_id}`,
    true,
    jwtToken
  );

const logout = async (jwtToken) =>
  await deletion("/logout", true, jwtToken)
    .then((res) => res.text())
    .catch((error) => error);

const getUserDatas = async (jwt_token) => {
  const userId = jwtDecode(jwt_token);
  return await find(`/users/${userId.sub}`, true, jwt_token);
};

const findUserDatas = async (userId) =>
  await find(`/users/${userId}`, false)
    .then((res) => res.json())
    .catch((error) => error);

export { signUserIn, signUserUp, getUserDatas, findUserDatas, logout, editUserProfile };
