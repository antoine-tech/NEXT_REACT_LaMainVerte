import React, { useState, useEffect } from "react";
import { findUserDatas } from "../../requests/user";
import { signalCommentPost } from "../../requests/posts";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from '../loaders/LoadingSpinner/index';
import useJwtToken from "../../hooks/useJwtToken";

const Comment = ({ id, content, user_id, warning, post_Id, updateWarning }) => {
  const { isLoading, setIsLoading } = useIsLoading();
  const [author, setAuthor] = useState(null);
  const { getJwtToken } = useJwtToken();

  const warningPostComment = async () => {
    const comment = await signalCommentPost(
      post_Id,
      content,
      getJwtToken,
      id
    )
    updateWarning();
  }

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
      className="comment col-span-12 justify-center grid grid-cols-12 p-4 my-2 border-gray-200 bg-white"
      style={{ borderWidth: "1px" }}
      id={`comment-${id}`}
    >
      <p className="col-span-2 my-2 italic font-blue-dark-light font-sm">
        {author?.user?.username}
      </p>

      <p id={id} className="col-span-12 flex">
        {content}
      </p>
      <div
        id="warning-icon"
        onClick={warningPostComment}
        title={warning? "ce post a été signalé comme contenu indésirable, il va être passé en revue par un administrateur" : "signaler"}
      >

          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z" fill={warning? "#ff6b6b" : "#c9cbd2"}/>
          </svg>
      </div> 
    </div>
  );
};

export default Comment;
