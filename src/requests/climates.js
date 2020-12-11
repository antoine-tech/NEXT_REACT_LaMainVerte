import { find } from "../sevices/Api";
const getClimates = async () => {
  return await find("/climates", false).then((res) => res.json());
};

export { getClimates };
