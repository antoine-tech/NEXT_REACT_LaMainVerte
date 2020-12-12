import { find } from "../sevices/Api";
import { findUserDatas } from "./user";

const getTestimonies = async () =>
  await find("/testimonies", false).then((res) => res.json());

const getTestimoniesAndRelatedUsers = async () => {
  // fetching testimonies
  let testimonyDatas = await getTestimonies();

  // accessing testimony users
  let testimonyUsersPromises = await testimonyDatas.map((testimony) =>
    findUserDatas(testimony.user_id)
  );

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
