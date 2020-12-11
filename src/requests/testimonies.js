import API from "../sevices/index";
import { findUserDatas } from "./user";

const getTestimonies = async () => {
  const response = await API.find("/testimonies", false).then((res) =>
    res.json()
  );

  return response;
};

const getTestimoniesAndRelatedUsers = async () => {
  // fetching testimonies
  let testimonyDatas = await getTestimonies();

  // accessing testimony users
  let testimonyUsersPromises = await testimonyDatas.map((testimony) => {
    return findUserDatas(testimony.user_id);
  });

  // resolving testimony users promises
  let testimonyUsers = await Promise.all(testimonyUsersPromises).then(
    (testimonyUser) => testimonyUser
  );

  // rconstructing testimonies final array of objects
  return testimonyDatas.map((testimony, index) => {
    return {
      ...testimony,
      user: testimonyUsers[index]?.user,
    };
  });
};

export { getTestimoniesAndRelatedUsers };
