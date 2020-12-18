import { useState } from "react";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const handleRemovePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return {
    posts: posts,
    handleRemovePost: (posts) => handleRemovePost(posts),
    setPosts:(posts)=>setPosts(posts)
  };
};

export default usePost;