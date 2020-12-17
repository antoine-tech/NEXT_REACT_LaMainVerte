import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  getGarden,
  follow,
  unfollow,
  unlikeGarden,
  likeGarden,
} from "../requests/gardens";
import useJwtToken from "../hooks/useJwtToken";
import useCurrentUser from "../hooks/useCurrentUser";
import useIsAmmendable from "../hooks/useIsAmmendable";
import PostCard from "../components/PostCard";
import PostCreation from "../components/Forms/PostCreation/index";
import Button from "../components/base_components/Button/index";
import CardIndicator from "../components/CardIndicator/index";
import GardenEditionForm from "../components/Forms/GardenEditionForm";
import IconPen from "../components/base_components/icons/IconPen/index";
import IconLabel from "../components/base_components/icons/IconLabel/index";
import IconClimate from "../components/base_components/icons/IconClimate/index";
import IconUpdate from "../components/base_components/icons/IconUpdate/index";
import IconLocation from "../components/base_components/icons/IconLocation/index";
import IconAdd from "../components/base_components/icons/IconAdd/index";
import MaskImage from "../assets/backgrounds/mask_image.png";

const Garden = () => {
  const history = useHistory();
  const [gardenData, setGardenData] = useState({});
  const [gardenFollow, setGardenFollow] = useState(null);
  const [isNewPostZoneDisplayed, setNewPostZoneDisplayed] = useState(false);
  const [myLike, setMyLike] = useState(null);
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const { isAmmendable, setIsAmmendable } = useIsAmmendable();
  const { garden_id } = useParams();

  const handleRemovePost = (postId) => {
    const newGardenData = {
      ...gardenData,
      posts: gardenData.posts.filter((post) => post.id !== postId),
    };
    setGardenData(newGardenData);
  };

  const handleSetOpacityValue = (value) => {
    const newData = {
      ...gardenData,
      garden: { ...gardenData.garden, picture_opacity: value },
    };
    setGardenData(newData);
  };

  const handleClickEventHistory = () => {
    history.push("/garden/" + garden_id + "/events");
  };

  const handleLike = async (idRessource) => {
    if (current_user) {
      if (myLike) {
        try {
          await unlikeGarden(myLike.id, getJwtToken);
          setMyLike(null);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const newLike = await likeGarden(idRessource, getJwtToken);
          setMyLike(newLike);
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const garden = await getGarden(garden_id);
        setGardenData(garden);
      } catch (error) {
        console.error(error);
      }
    } else {
      history.push("/login");
    }
  };

  const handleFollow = async (garden_id) => {
    if (current_user) {
      if (gardenFollow) {
        await unfollow(gardenFollow.id, getJwtToken);
        setGardenFollow(null);
      } else {
        const followGarden = await follow(garden_id, getJwtToken);
        setGardenFollow(followGarden);
      }
      const garden = await getGarden(garden_id);
      setGardenData(garden);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    const fetchGardenData = async () => {
      const garden = await getGarden(garden_id);
      setGardenData(garden);
    };

    fetchGardenData();
  }, [garden_id]);

  useEffect(() => {
    const userLike = gardenData?.likes?.find(
      (el) =>
        el.garden_id === parseInt(garden_id) && el.user_id === current_user?.id
    );

    const userFollow = gardenData?.follows?.find(
      (el) =>
        el.garden_id === parseInt(garden_id) && el.user_id === current_user?.id
    );

    userFollow && setGardenFollow(userFollow);
    userLike && setMyLike(userLike);
  }, [gardenData, current_user]);

  return (
    <section className="relative">
      <div
        className="absolute z-10 w-full"
        style={{
          backgroundImage: `url(${gardenData?.garden?.picture_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <img
          src={MaskImage}
          alt=""
          className="h-full w-full"
          style={{
            backgroundColor: `rgba(255,255,255,${gardenData?.garden?.picture_opacity})`,
          }}
        />
      </div>

      <div className="grid grid-cols-12 relative z-20">
        <div className="hidden lg:block col-span-3"></div>

        <div
          className="grid grid-cols-4 gap-4 col-span-12 lg:col-span-6 bg-white min-h-screen p-12"
          style={{ marginTop: "20%" }}
        >
          <h2 className="italic col-span-2">
            Par {gardenData?.user?.fist_name} {gardenData?.user?.last_name}
          </h2>
          {current_user && current_user.id === gardenData?.user?.id && (
            <div className="col-span-2 flex justify-self-end">
              <Button
                content={IconAdd}
                classNames={[
                  "h-20",
                  "w-20",
                  "mx-2",
                  "flex",
                  "items-center",
                  "justify-center",
                  "p-2",
                  "bg-blue-dark",
                  "text-white",
                  "text-center",
                  "rounded-full",
                  "hover-animate-bounce",
                ]}
                onclick={() => setNewPostZoneDisplayed(!isNewPostZoneDisplayed)}
              />

              <Button
                content={IconPen}
                classNames={[
                  "h-20",
                  "w-20",
                  "mx-2",
                  "flex",
                  "items-center",
                  "justify-center",
                  "p-2",
                  "bg-blue-dark",
                  "text-white",
                  "text-center",
                  "rounded-full",
                  "hover-animate-bounce",
                ]}
                onclick={() => setIsAmmendable()}
              />
            </div>
          )}

          {!isAmmendable && (
            <>
              <h1 className="col-span-4 text-center my-8">
                {gardenData?.garden?.name.toUpperCase()}
              </h1>

              <h4 className="col-span-4 text-center my-8">
                {gardenData?.garden?.description}
              </h4>
            </>
          )}
          <div className="col-span-4 main-data-container flex flex-wrap justify-between mt-8">
            {isAmmendable ? (
              <GardenEditionForm
                gardenData={gardenData}
                updateGardenData={(value) =>
                  setGardenData({ ...gardenData, garden: value })
                }
                setOpacityValue={(value) => handleSetOpacityValue(value)}
                setIsAmmendable={(value) => setIsAmmendable(value)}
              />
            ) : (
              <>
                <CardIndicator
                  icon={IconUpdate}
                  dataText={
                    <Moment
                      format={"DD/MM/YYY à hh:mm:ss"}
                      className="text-center w-full block"
                    >
                      {gardenData?.garden?.updated_at}
                    </Moment>
                  }
                  onClick={handleClickEventHistory}
                />
                <CardIndicator
                  icon={IconClimate}
                  dataText={gardenData?.climate?.name}
                />
                <CardIndicator
                  icon={IconLabel}
                  dataText={gardenData?.type?.name}
                />
                <CardIndicator
                  icon={IconLocation}
                  dataText={gardenData?.location?.name}
                />
              </>
            )}
          </div>

          {isNewPostZoneDisplayed && (
            <PostCreation
              setGardenData={setGardenData}
              gardenData={gardenData}
              setNewPostZoneDisplayed={setNewPostZoneDisplayed}
            />
          )}

          {current_user &&
            current_user.id !== gardenData?.user?.id &&
            gardenFollow && (
              <Button
                text="Ne plus suivre"
                classNames={[
                  "btn",
                  "btn-lg",
                  "bg-blue-dark",
                  "text-white",
                  "p-4",
                  "w-full",
                  "col-span-4",
                  "lg:col-span-2",
                ]}
                onclick={() => handleFollow(garden_id)}
              />
            )}

          {current_user &&
            current_user.id !== gardenData?.user?.id &&
            gardenFollow === null && (
              <Button
                text="Suivre"
                classNames={[
                  "btn",
                  "btn-lg",
                  "bg-blue-dark",
                  "text-white",
                  "p-4",
                  "w-full",
                  "col-span-4",
                  "lg:col-span-2",
                ]}
                onclick={() => handleFollow(garden_id)}
              />
            )}

          {current_user &&
            current_user?.id !== gardenData?.user?.id &&
            myLike !== null && (
              <Button
                text="Je n'aime plus"
                classNames={[
                  "btn",
                  "btn-lg",
                  "border-blue-dark",
                  "text-dark",
                  "p-4",
                  "w-full",
                  "col-span-4",
                  "lg:col-span-2",
                ]}
                onclick={() => handleLike(garden_id)}
              />
            )}

          {current_user &&
            current_user.id !== gardenData?.user?.id &&
            myLike == null && (
              <Button
                text="J'aime ce jardin"
                classNames={[
                  "btn",
                  "btn-lg",
                  "border-red",
                  "text-dark",
                  "p-4",
                  "w-full",
                  "col-span-4",
                  "lg:col-span-2",
                ]}
                onclick={() => handleLike(garden_id)}
              />
            )}

          <div className="my-8 col-span-4">
            {gardenData?.posts?.length > 0 ? (
              <h3 className="my-4">Les posts</h3>
            ) : (
              <h3 className="my-4">Rien pour le moment ...</h3>
            )}

            {gardenData?.posts?.map((post) => {
              let {
                id,
                garden_id,
                title,
                content,
                created_at,
                updated_at,
                likes,
              } = post;
              return (
                <PostCard
                  key={`post-${id}`}
                  id={id}
                  title={title}
                  content={content}
                  garden_id={garden_id}
                  created_at={created_at}
                  updated_at={updated_at}
                  likes={likes}
                  removePost={(postId) => handleRemovePost(postId)}
                />
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block col-span-3"></div>
      </div>
    </section>
  );
};

export default Garden;
