import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { findUserDatas } from "../../requests/user";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from "../loaders/LoadingSpinner/index";
import "./index.scss";
import Avatar from "../Avatar/index";

const TestimonyCard = ({ id, content, user_id, created_at, updated_at }) => {
  const { isLoading, setIsLoading } = useIsLoading();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAndSetAuthor = async () => {
      const {user} = await findUserDatas(user_id);
      setAuthor(user);
    };
    fetchAndSetAuthor();
    setIsLoading(false);
  }, [user_id]);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className="testimony-card grid grid-cols-12 p-4 my-4"
      id={`testimony-${id}`}
    >
      <div className="flex col-span-2 items-center">
        <Avatar
          type={"half"}
          imageSrc={author?.avatar_url}
          userName={author?.username}
        />
      </div>

      <h5 className="flex col-start-10 col-span-3 items-center">
        <Moment
          format="DD/MM/YYYY à hh:mm:ss"
          className="block w-full text-right italic font-blue-dark-light font-sm"
        >
          {created_at}
        </Moment>
      </h5>

      <div className="col-span-12 lg:col-span-12 flex flex-col justify-center grid grid-cols-2">
        <p className="col-span-2 my-2">{content}</p>
      </div>
    </div>
  );
};

export default TestimonyCard;
