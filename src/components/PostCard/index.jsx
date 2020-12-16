import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import IconHeart from "../icons/IconHeart/index";
import {
  getPost,
  likePost,
  unlikePost,
  commentPost,
} from "../../requests/posts";
import useCurrentUser from "../../hooks/useCurrentUser";
import useJwtToken from "../../hooks/useJwtToken";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from "../LoadingSpinner/index";
import Comment from "../Comment";
import IconComment from "../icons/IconComment/index";
import Button from "../Button/index";
import TextArea from "../TextArea/index";

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
  const [areCommentDisplayed, setAreCommentDiplayed] = useState(false);
  const history = useHistory();

  const { current_user } = useCurrentUser();

  const { getJwtToken } = useJwtToken();

  const [myLike, setMyLike] = useState(null);

  const { isLoading, setIsLoading } = useIsLoading();

  const [newCommentValue, setNewCommentValue] = useState(
    "Votre avis compte, laissez un commentaire !"
  );

  const handleClick = (garden_id) => {
    history.push("/garden/" + garden_id);
  };

  const handleCommentInput = (event) => {
    setNewCommentValue(event.target.value);
  };

  const handleCommentCreation = async (postId) => {
    const comment = await commentPost(postId, newCommentValue, getJwtToken);
    const newComments = [...postData.comments, comment];
    setPostData({ ...postData, comments: newComments });
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

    const userLike = postData?.likes?.find(
      (el) => el.post_id === id && el.user_id === current_user?.id
    );
    userLike && setMyLike(userLike);

    setIsLoading(false);
  }, [postData]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="post-card grid grid-cols-12 p-4 my-4" id={`post-${id}`}>
        <div className="flex col-span-2 items-center">
          <div
            className="suggestion-avatar-half"
            onClick={() => handleClick(garden_id)}
          >
            <div className="avatar-img"><img src={postData?.user?.avatar_url} className="h-full w-full rounded-full" alt="avatar"/></div>
          </div>

          <p className="my-4 font-blue-dark-light font-sm ml-2">
            {postData?.user?.username}
          </p>
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
          <h5 className="col-span-1 ">{title}</h5>
          <p className="col-span-2 my-2">{content}</p>
        </div>

        {current_user ? (
          <>
            <div className="col-start-11 col-span-1 flex items-center justify-end">
              <IconComment
                onclick={() => setAreCommentDiplayed(!areCommentDisplayed)}
              />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <IconHeart
                id={id}
                fillColor={myLike ? "#ff6b6b" : "#3A405A"}
                onclick={(value) => handleLike(value)}
              />
              <span className="ml-2"> {postData?.likes?.length}</span>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-12 col-span-1 flex items-center justify-end">
              <IconComment
                onclick={() => setAreCommentDiplayed(!areCommentDisplayed)}
              />
            </div>
          </>
        )}
      </div>
      {areCommentDisplayed && (
        <>
          {postData?.comments?.length > 0 &&
            postData.comments.map((comment) => {
              let { id, content, user_id } = comment;
              return (
                <Comment
                  key={`comment-${id}`}
                  id={id}
                  user_id={user_id}
                  content={content}
                />
              );
            })}

          {current_user && (
            <div
              className="col-span-12 justify-center grid grid-cols-12 p-4 my-2 bg-white border-gray-200"
              style={{ borderWidth: "1px" }}
            >
              <TextArea
                id="post-creation"
                name="post-creation"
                cols="30"
                rows="10"
                classNames={["col-span-12"]}
                oninput={(event) => handleCommentInput(event)}
                value={newCommentValue}
              />

              <Button
                onclick={() => handleCommentCreation(id)}
                text="ENVOYER"
                classNames={[
                  "border-blue-dark-light",
                  "col-span-12",
                  "p-4",
                  "lg:col-span-12",
                  "mt-4",
                ]}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostCard;
