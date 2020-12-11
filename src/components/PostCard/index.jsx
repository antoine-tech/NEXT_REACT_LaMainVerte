import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import IconHeart from "../icons/IconHeart/index";
import { getPost, likePost, unlikePost } from "../../requests/posts";
import useCurrentUser from "../../hooks/useCurrentUser";
import useJwtToken from "../../hooks/useJwtToken";

const PostCard = ({
  id,
  title,
  content,
  garden_id,
  created_at,
  updated_at,
  likes,
}) => {
  const [postData, setPostData] = useState([]);
  const history = useHistory();

  const { current_user } = useCurrentUser();

  const { getJwtToken } = useJwtToken();

  const [myLike, setMyLike] = useState(null);

  const handleClick = (garden_id) => {
    history.push("/garden/" + garden_id);
  };

  const handleLike = async (idRessource) => {
    if (current_user) {
      if (myLike) {
        await unlikePost(myLike.id, getJwtToken);
        setMyLike(null);
      } else {
        const newLike = await likePost(idRessource, getJwtToken);
        setMyLike(newLike);
      }
      const post = await getPost(id);
      setPostData(post);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);

      setPostData(post);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const userLike = postData?.likes?.find(
      (el) => el.post_id === id && el.user_id === current_user?.current_user.id
    );

    userLike && setMyLike(userLike);
  }, [postData]);

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
          <IconHeart
            id={id}
            fillColor={myLike ? "#ff6b6b" : "#3A405A"}
            onclick={(value) => handleLike(value)}
          />
          <span className="ml-2"> {postData?.likes?.length}</span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
