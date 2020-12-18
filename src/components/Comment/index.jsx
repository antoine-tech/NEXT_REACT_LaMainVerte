import React, { useState, useEffect } from "react";
import { findUserDatas } from "../../requests/user";
import { signalCommentPost } from "../../requests/posts";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from '../loaders/LoadingSpinner/index';
import useJwtToken from "../../hooks/useJwtToken";
import { deleteComment } from "../../requests/posts";
import useCurrentUser from "../../hooks/useCurrentUser";
import IconDelete from "../base_components/icons/IconDelete";

const Comment = ({ id, content, user_id, warning, post_Id, updateWarning, removeComment }) => {
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const { isLoading, setIsLoading } = useIsLoading();
  const [author, setAuthor] = useState(null);

  const warningPostComment = async () => {
    const comment = await signalCommentPost(
      post_Id,
      content,
      getJwtToken,
      id
    )
    updateWarning();
  }

  const handleDelete = async (commentId) => {
    const response = await deleteComment(commentId, getJwtToken);
    removeComment(commentId)
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      const authorData = user_id && (await findUserDatas(user_id));
      setAuthor(authorData);
      setIsLoading(false);
    };

    fetchAuthorData();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className="comment col-span-12 grid justify-items-stretch grid-cols-12 p-4 my-2 border-gray-200 bg-white"
      style={{ borderWidth: "1px" }}
      id={`comment-${id}`}
    >
      <p className="col-span-2 my-2 italic font-blue-dark-light font-sm">
        {author?.user?.username}
      </p>

      <p id={id} className="col-span-12 flex">
        {content}
      </p>

      {author?.user?.id === current_user?.id && (
        <div className="col-span-1 col-start-12 flex items-center justify-end">
          <IconDelete onClick={()=>handleDelete(id)} />
        </div>
      )}
    </div>
  );
};

export default Comment;
