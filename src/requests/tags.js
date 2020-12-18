import { find } from "../sevices/Api";
const getTags = async () =>
  await find("/tags", false).then((res) => res.json());

export { getTags };
