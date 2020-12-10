import API from "../sevices/index";

const getPosts = async () => {
  const response = await API.find("/posts", false).then((res) => res.json());

  return response;
};

export { getPosts };
