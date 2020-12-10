import React from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import IconHeart from "../icons/IconHeart/index";

// Ex :
// {
//     "id": 1,
//     "title": "Whirlpool",
//     "content": "The Guild... they're fighting me in the mental vaults. They're behind everything. They fear the one who will come, who will know more, who will see more. The Guild is behind everything. It's not finished yet. I'm not formed.",
//     "garden_id": 5,
//     "created_at": "2020-12-09T10:44:21.359Z",
//     "updated_at": "2020-12-09T10:44:21.359Z"
// }

const PostCard = ({
  id,
  title,
  content,
  garden_id,
  created_at,
  updated_at,
  likes,
}) => {
  const history = useHistory();
  const handleClick = (garden_id) => {
    history.push("/garden/" + garden_id);
  };

  return (
    <div className="post-card grid grid-cols-8 p-4 my-4" id={id}>
      <div className="col-span-2 flex items-center">
        <div
          className="suggestion-avatar-half"
          onClick={() => handleClick(garden_id)}
        >
          <div className="avatar-img"></div>
        </div>
      </div>

      <div className="col-span-6 flex flex-col justify-center grid grid-cols-2">
        <h5 className="col-span-1">{title}</h5>
        <h5 className="col-span-1">
          <Moment
            format="DD/MM/YYYY à hh:mm:ss"
            className="block w-full text-right"
          >
            {created_at}
          </Moment>
        </h5>
        <p className="col-span-2 my-2">{content}</p>

        <p className="col-start-2 col-span-1 flex items-center justify-end">
          <IconHeart />
          <span className="ml-2"> {likes}</span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
