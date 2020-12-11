import API from "../sevices/index";

const getPosts = async () => {
  const response = await API.find("/posts", false).then((res) => res.json());

  return response;
};

const getPost = async (idPost) => {
  const response = await API.find("/posts/" + idPost, false)
    .then((res) => res.json())
    .catch((error) => error);
  return response;
};

const likePost = async (idPost, jwt_token) => {
  const data = {
    post_like: { post_id: idPost },
  };
  const response = await API.create(data, "/post_likes", true, jwt_token)
    .then((res) => res.json())
    .catch((error) => error);

  return response;
};

const unlikePost = async (postLikeId, jwt_token) => {
  const response = await API.delete("/post_likes/"+postLikeId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

  return response;
};

export { getPosts, getPost, likePost, unlikePost };
