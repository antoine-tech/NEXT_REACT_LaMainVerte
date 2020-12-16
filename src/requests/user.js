import { find, create, deletion, update } from "../sevices/Api";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const signUserIn = async (email, password) => {
  const response = await create(
    {
      user: {
        email,
        password,
      },
    },
    "/login",
    false
  )
    .then(async (res) => {
      if (res.headers.get("Authorization")) {
        Cookies.set('jwt_token', res.headers.get("Authorization"));
       
        const user_data = await getUserDatas(res.headers.get("Authorization"));
        return user_data.user;
      }
    })
    .catch((error) => error);

  return response;
};

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
  avatar_url,
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
        avatar_url,
        password,
        password_confirmation,
      },
    },
    `/users/${user_id}`,
    true,
    jwtToken
  );

const removeProfile = async (
  user_id,
  jwtToken
) =>
  await deletion(
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
  const userData = await find(
    `/users/${userId.sub}`,
    true,
    jwt_token
  ).then((res) => res.json());
  return userData;
};

const findUserDatas = async (userId) =>
  await find(`/users/${userId}`, false)
    .then((res) => res.json())
    .catch((error) => error);

export { signUserIn, signUserUp, getUserDatas, findUserDatas, logout, editUserProfile, removeProfile };
