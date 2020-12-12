import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaskImage from "../assets/backgrounds/mask_image.png";
import CardIndicator from "../components/CardIndicator/index";
import IconClimate from "../components/icons/IconClimate/index";
import IconLabel from "../components/icons/IconLabel/index";
import IconLocation from "../components/icons/IconLocation/index";
import IconUpdate from "../components/icons/IconUpdate/index";
import PostCard from "../components/PostCard";
import {
  getGarden,
  follow,
  unfollow,
  unlikeGarden,
  likeGarden,
} from "../requests/gardens";
import Moment from "react-moment";
import Button from "../components/Button/index";
import useJwtToken from "../hooks/useJwtToken";
import useCurrentUser from "../hooks/useCurrentUser";
const Garden = () => {
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const { id } = useParams();
  const [gardenData, setGardenData] = useState({});
  const [gardenFollow, setGardenFollow] = useState(null);
  const history = useHistory();
  const [myLike, setMyLike] = useState(null);

  const handleClickEventHistory = () => {
    history.push("/garden/" + id + "/events");
  };

  const handleLike = async (idRessource) => {
    if (current_user) {
      if (myLike) {
        await unlikeGarden(myLike.id, getJwtToken);
        setMyLike(null);
      } else {
        const newLike = await likeGarden(idRessource, getJwtToken);
        setMyLike(newLike);
      }
      const garden = await getGarden(id);
      setGardenData(garden);
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
      const garden = await getGarden(id);
      setGardenData(garden);
    }
  };

  useEffect(() => {
    const fetchGardenData = async () => {
      const garden = await getGarden(id);
      setGardenData(garden);
    };

    fetchGardenData();
  }, [id]);

  useEffect(() => {
    const userLike = gardenData?.likes?.find(
      (el) => el.garden_id == id && el.user_id == current_user?.current_user.id
    );
    const userFollow = gardenData?.follows?.find(
      (el) => el.garden_id == id && el.user_id == current_user?.current_user.id
    );

    userFollow && setGardenFollow(userFollow);
    userLike && setMyLike(userLike);
  }, [gardenData]);

  return (
    <section className="relative">
      <div
        className="absolute z-10 w-full"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3708717/pexels-photo-3708717.jpeg)",
        }}
      >
        <img
          src={MaskImage}
          alt=""
          className="h-full w-full"
          style={{ backgroundColor: "rgba(255,255,255,.5)" }}
        />
      </div>

      <div className="grid grid-cols-12 relative z-20">
        <div className="hidden lg:block col-span-3"></div>

        <div
          className="col-span-12 lg:col-span-6 bg-white min-h-screen p-12"
          style={{ marginTop: "20%" }}
        >
          <h1 className="text-center my-8">
            {gardenData?.garden?.name.toUpperCase()}
          </h1>

          <h2 className="italic">
            Par {gardenData?.user?.fist_name} {gardenData?.user?.last_name}
          </h2>

          <div className="main-data-container flex flex-wrap justify-between my-8">
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
              dataText={gardenData?.label?.name}
            />
            <CardIndicator
              icon={IconLocation}
              dataText={gardenData?.location?.name}
            />
          </div>

          <div className="my-8">
            <h3 className="my-4">Description :</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              cursus et mattis pulvinar neque mauris nunc lacinia. Blandit quis
              non eu pretium varius quis enim. Sed eu sit in nulla aliquet a.
              Molestie ut felis suscipit donec nunc mauris. Diam sit tempus,
              interdum blandit nascetur lorem. Arcu dictum sociis nec vitae vel
              et leo, cum. Volutpat nullam volutpat non duis lectus morbi sed.
              Cras gravida lectus sapien porttitor duis. Ac, ut viverra
              consectetur ac est. Sed blandit neque nulla pellentesque in
              vestibulum eget. Elit nec quis eget elementum nulla pellentesque
              nibh dictum elementum.
            </p>
          </div>

          <div className="my-8 grid grid-cols-2 gap-4">
            {gardenFollow !== null ? (
              <Button
                text="Ne plus suivre"
                classNames={[
                  "btn",
                  "btn-lg",
                  "bg-blue-dark",
                  "text-white",
                  "p-4",
                  "w-full",
                  "col-span-2",
                  "lg:col-span-1",
                ]}
                onclick={() => handleFollow(id)}
              />
            ) : (
              <Button
                text="Suivre"
                classNames={[
                  "btn",
                  "btn-lg",
                  "bg-blue-dark",
                  "text-white",
                  "p-4",
                  "w-full",
                  "col-span-2",
                  "lg:col-span-1",
                ]}
                onclick={() => handleFollow(id)}
              />
            )}
            {myLike !== null ? (
              <Button
                text="Je n'aime plus"
                classNames={[
                  "btn",
                  "btn-lg",
                  "border-blue-dark",
                  "text-dark",
                  "p-4",
                  "w-full",
                  "col-span-2",
                  "lg:col-span-1",
                ]}
                onclick={() => handleLike(id)}
              />
            ) : (
              <Button
                text="J'aime ce jardin"
                classNames={[
                  "btn",
                  "btn-lg",
                  "border-red",
                  "text-dark",
                  "p-4",
                  "w-full",
                  "col-span-2",
                  "lg:col-span-1",
                ]}
                onclick={() => handleLike(id)}
              />
            )}
          </div>

          <div className="my-8">
            <h3 className="my-4">Les posts</h3>


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
