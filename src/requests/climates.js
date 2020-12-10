import API from "../sevices/index";

const getClimates = async () => {
  const response = await API.find("/climates", false).then((res) => res.json());

  return response;
};

export { getClimates };
