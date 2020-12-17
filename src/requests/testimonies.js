import { find } from "../sevices/Api";

const getTestimonies = async () =>
  await find("/testimonies", false).then((res) => res.json());

export { getTestimonies};
