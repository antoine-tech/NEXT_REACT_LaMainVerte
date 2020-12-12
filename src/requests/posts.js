import { find, create, deletion } from "../sevices/Api";

const getPosts = async () => {
  return await find("/posts", false).then((res) => res.json());
};

const getPost = async (idPost) => {
  return await find("/posts/" + idPost, false)
    .then((res) => res.json())
    .catch((error) => error);
};

const likePost = async (idPost, jwt_token) => {
  const data = {
    post_like: { post_id: idPost },
  };
  return await create(data, "/post_likes", true, jwt_token)
    .then((res) => res.json())
    .catch((error) => error);
};

const unlikePost = async (postLikeId, jwt_token) => {
  return await deletion("/post_likes/" + postLikeId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);
};

const commentPost = async (postId, content, jwtToken) => {
  const data = { post_comment: { content: content } };
  return await create(
    data,
    `/posts/${postId}/post_comments`,
    true,
    jwtToken
  ).then((res) => res.json());
};

export { getPosts, getPost, likePost, unlikePost, commentPost };
