import { find, create, deletion, update } from "../sevices/Api";

const getPosts = async () =>
  await find("/posts", false).then((res) => res.json());

const getPost = async (idPost) =>
  await find("/posts/" + idPost, false)
    .then((res) => res.json())
    .catch((error) => error);

const likePost = async (idPost, jwt_token) => {
  const data = {
    post_like: { post_id: idPost },
  };
  return await create(data, "/post_likes", true, jwt_token)
    .then((res) => res.json())
    .catch((error) => error);
};

const unlikePost = async (postLikeId, jwt_token) =>
  await deletion("/post_likes/" + postLikeId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

const commentPost = async (postId, content, jwtToken) => {
  const data = { post_comment: { content: content } };
  return await create(
    data,
    `/posts/${postId}/post_comments`,
    true,
    jwtToken
  ).then((res) => res.json());
};

const signalCommentPost = async (postId, content, jwtToken, id) => {
  const data = { post_comment: { content: content, warning: true } };
  return await update(
    data,
    `/post_comments/${id}`,
    true,
    jwtToken
  ).then((res) => res.json());
}
const deletePost = async (postId, jwt_token) =>
  await deletion("/posts/" + postId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

const deleteComment = async (commentId, jwt_token) =>
  await deletion("/post_comments/" + commentId, true, jwt_token)
    .then((res) => res.text())
    .catch((error) => error);

const createPost = async (
  jwtToken,
  garden_id,
  title,
  content,
  pictures_url
) => {
  const data = {
    post: {
      title,
      content,
      pictures_url: pictures_url,
    },
  };

  return await create(
    data,
    `/gardens/${garden_id}/posts`,
    true,
    jwtToken
  ).then((res) => res.json());


}

const signalPost = async (garden_id, title, content, pictures_url, jwtToken, post_id) =>
{
  const data ={
    'post':{
      garden_id,
      title,
      content,
      pictures_url,
      warning: true,
    }
  }

  return await update(
    data,
    `/posts/${post_id}`,
    true,
    jwtToken
  ).then((res) => res.json());


}
export { getPosts, getPost, likePost, unlikePost, commentPost, createPost, signalPost, signalCommentPost, deletePost, deleteComment, };
