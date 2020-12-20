import { find, deletion } from "../services/Api";
import jwtDecode from "jwt-decode";

const getAdminData = async (jwt_token) => {
  const adminData = await find(
    `/admins`,
    true,
    jwt_token
  ).then((res) => res.json())
  return adminData;
};

const deleteContent = async (
  type,
  id,
  jwtToken
) =>
  await deletion(
    `/${type}/${id}`,
    true,
    jwtToken
  );

export { getAdminData, deleteContent };