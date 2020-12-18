import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import {
  getPost,
  likePost,
  unlikePost,
  commentPost,
  signalPost,
  deletePost,
} from "../../requests/posts";
import useCurrentUser from "../../hooks/useCurrentUser";
import useJwtToken from "../../hooks/useJwtToken";
import useIsLoading from "../../hooks/useIsLoading";
import Comment from "../Comment";
import LoadingSpinner from "../loaders/LoadingSpinner/index";
import IconHeart from "../base_components/icons/IconHeart/index";
import IconComment from "../base_components/icons/IconComment/index";
import TextArea from "../base_components/TextArea/index";
import Button from "../base_components/Button/index";
import Avatar from "../Avatar/index";
import "./index.scss";
import PostSlider from "../PostSlider";
import IconDelete from "../base_components/icons/IconDelete";

const PostCard = ({ id, removePost }) => {
  const [postData, setPostData] = useState([]);
  const [myLike, setMyLike] = useState(null);
  const [postWarning, setPostWarning] = useState(false);
  const [commentPostWarning, setCommentPostWarning] = useState(false);
  const [newCommentValue, setNewCommentValue] = useState(
    "Votre avis compte, laissez un commentaire !"
  );
  const [areCommentDisplayed, setAreCommentDiplayed] = useState(false);
  const history = useHistory();
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const { isLoading, setIsLoading } = useIsLoading();

  const handleClick = (garden_id) => {
    history.push("/garden/" + garden_id);
  };

  const warningPost = async () => {
    const post = await signalPost(
      postData.post.garden_id, 
      postData.post.title, 
      postData.post.content,
      postData.post.pictures_url,
      getJwtToken,
      postData.post.id
    )
    setPostWarning(true);
  }
  const handleRemoveComment = (id) => {
    const newComments = postData.comments.filter(
      (comment) => comment.id !== id
    );
    setPostData({ ...postData, comments: newComments });
  };

  const handleDelete = async (postId) => {
    const response = await deletePost(postId, getJwtToken);
    removePost(postId)
  };

  const handleCommentInput = (value) => {
    setNewCommentValue(value);
  };

  const updateCommentWarning = () => {
    setCommentPostWarning(true);
  }

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
    const fetchAndSetPost = async () => {
      const post = await getPost(id);
      setPostData(post);
    };
    fetchAndSetPost();

    const userLike = postData?.likes?.find(
      (el) => el.post_id === id && el.user_id === current_user?.id
    );
    userLike && setMyLike(userLike);

    setIsLoading(false);
  }, [id, postWarning, commentPostWarning]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="post-card grid grid-cols-12 p-4 my-4" id={`post-${id}`}>
        {postData?.post?.pictures_url.length > 0 && (
          <PostSlider
            classNames={["col-span-12", "p-0"]}
            sliderData={postData.post.pictures_url}
          />
        )}

        <div className="flex col-span-2 items-center">
          <Avatar
            type="half"
            imageSrc={postData?.user?.avatar_url}
            userName={postData?.user?.username}
          />
        </div>

        <h5 className="flex col-start-10 col-span-3 items-center">
          <Moment
            format="DD/MM/YYYY à hh:mm:ss"
            className="block w-full text-right italic font-blue-dark-light font-sm"
          >
            {postData?.post?.created_at}
          </Moment>
        </h5>

        <div className="col-span-12 lg:col-span-12 flex flex-col justify-center grid grid-cols-2">
          <h5 className="col-span-1 ">{postData?.post?.title}</h5>
          <p className="col-span-2 my-2">{postData?.post?.content}</p>
        </div>

        {current_user ? (
          current_user.id === postData?.user?.id ? (
            <>
              <div className="col-start-10 col-span-1 flex items-center justify-end">
                <IconComment
                  onclick={() => setAreCommentDiplayed(!areCommentDisplayed)}
                />
                <span className="mx-2"> {postData?.comments?.length}</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <IconHeart
                  id={id}
                  fillColor={myLike ? "#ff6b6b" : "#3A405A"}
                  onclick={(value) => handleLike(value)}
                />
                <span className="ml-2"> {postData?.likes?.length}</span>
              </div>

              <div className="col-span-1 flex items-center justify-end">
                <IconDelete onClick={() => handleDelete(postData.post.id)} />
              </div>
              <div className="col-span-1 flex items-center justify-end" 
                title={
                  postData?.post?.warning?
                    "ce post a été signalé comme contenu indésirable, il va être passé en revue par un administrateur"
                  :
                    "signaler"
                  } 
                  onClick={warningPost}
                  id="warning-icon"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z" fill={postData?.post?.warning? "#ff6b6b" : "#c9cbd2"}/>
                </svg>
              </div>
            </>
          ) : (
            <>
              <div className="col-start-1 col-span-1 flex items-center justify-end">
                <IconComment
                  onclick={() => setAreCommentDiplayed(!areCommentDisplayed)}
                />
                <span className="mx-2"> {postData?.comments?.length}</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <IconHeart
                  id={id}
                  fillColor={myLike ? "#ff6b6b" : "#3A405A"}
                  onclick={(value) => handleLike(value)}
                />
                <span className="ml-2"> {postData?.likes?.length}</span>
              </div>
              { current_user &&
              <div className="col-span-1 flex items-center justify-end" 
                title={
                  postData?.post?.warning?
                    "ce post a été signalé comme contenu indésirable, il va être passé en revue par un administrateur"
                  :
                    "signaler"
                  } 
                  onClick={warningPost}
                  id="warning-icon"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z" fill={postData?.post?.warning? "#ff6b6b" : "#c9cbd2"}/>
                </svg>
              </div>
              }
            </>
          )
        ) : (
          <>
            <div className="col-start-12 col-span-1 flex items-center justify-end">
              <IconComment
                onclick={() => setAreCommentDiplayed(!areCommentDisplayed)}
              />
              <span className="mx-2"> {postData?.comments?.length}</span>
            </div>
          </>
        )}
      </div>
      {areCommentDisplayed && (
        <>
          {postData?.comments?.length > 0 &&
            postData.comments.map((comment) => {
              let { id, content, user_id, warning, post_id } = comment;
              return (
                <Comment
                  key={`comment-${id}`}
                  id={id}
                  user_id={user_id}
                  content={content}
                  warning={warning}
                  post_id={post_id}
                  updateWarning={updateCommentWarning}
                  removeComment={(value) => handleRemoveComment(value)}
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
                onInput={(obj) => handleCommentInput(obj.value)}
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
