import React, { useState, useEffect } from "react";
import { findUserDatas } from "../../requests/user";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from "../LoadingSpinner";

const Comment = ({ id, content, user_id }) => {
  const { isLoading, setIsLoading } = useIsLoading();
  const [author, setAuthor] = useState(null);

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
    <div className="comment col-span-12 justify-center grid grid-cols-12 p-4 my-2 border-gray-200" style={{borderWidth:'1px'}}>
    
        <p className="col-span-2 my-2 italic font-blue-dark-light font-sm">
          {author?.user?.username}
        </p>
      <p id={id} className="col-span-12 flex">
        {content}
      </p>
    </div>
  );
};

export default Comment;
