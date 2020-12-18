import { find, deletion } from "../sevices/Api";

const getTestimonies = async () =>
  await find("/testimonies", false).then((res) => res.json());

const deleteTestimony = async (testimonyId, jwt_token) =>
  await deletion("/testimonies/" + testimonyId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

export { getTestimonies, deleteTestimony };
