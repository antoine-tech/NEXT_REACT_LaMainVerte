import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaskImage from "../assets/backgrounds/mask_image.png";
import CardIndicator from "../components/CardIndicator/index";
import IconClimate from "../components/icons/IconClimate/index";
import IconLabel from "../components/icons/IconLabel/index";
import IconLocation from "../components/icons/IconLocation/index";
import IconUpdate from "../components/icons/IconUpdate/index";
import PostCard from "../components/PostCard";
import Moment from "react-moment";
import Button from "../components/Button/index";
import useJwtToken from "../hooks/useJwtToken";
import useCurrentUser from "../hooks/useCurrentUser";
import IconPen from "../components/icons/IconPen/index";
import useIsAmmendable from "../hooks/useIsAmmendable";
import TextArea from "../components/TextArea/index";
import Select from "../components/Select/index";
import SliderInput from "../components/SliderInput/index";
import Input from "../components/Input/index";
import {
  getGarden,
  follow,
  unfollow,
  unlikeGarden,
  likeGarden,
} from "../requests/gardens";

const Garden = () => {
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const { isAmmendable, setIsAmmendable } = useIsAmmendable();
  const { id } = useParams();
  const [gardenData, setGardenData] = useState({});
  const [gardenFollow, setGardenFollow] = useState(null);
  const history = useHistory();
  const [myLike, setMyLike] = useState(null);

  const [opacityValue, setOpacityValue] = useState(0.1);

  const handleOpacityValue = (value) => {
    setOpacityValue(1 - value / 100);
  };

  const handleClickEventHistory = () => {
    history.push("/garden/" + id + "/events");
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
        const garden = await getGarden(id);
        setGardenData(garden);
      } catch (error) {
        console.error(error);
      }
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

  const handleChangeGardenLocation = (value) => {
    console.log(value);
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
      (el) => el.garden_id === parseInt(id) && el.user_id === current_user?.id
    );

    const userFollow = gardenData?.follows?.find(
      (el) => el.garden_id === parseInt(id) && el.user_id === current_user?.id
    );

    userFollow && setGardenFollow(userFollow);
    userLike && setMyLike(userLike);
  }, [gardenData]);

  return (
    <section className="relative">
      <div
        className="absolute z-10 w-full"
        style={{
          backgroundImage: `url(${gardenData?.garden?.picture_url})`,
        }}
      >
        {isAmmendable ? (
          <img
            src={MaskImage}
            alt=""
            className="h-full w-full"
            style={{ backgroundColor: `rgba(255,255,255,${opacityValue})` }}
          />
        ) : (
          <img
            src={MaskImage}
            alt=""
            className="h-full w-full"
            style={{
              backgroundColor: `rgba(255,255,255,${gardenData?.garden?.picture_opacity})`,
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-12 relative z-20">
        <div className="hidden lg:block col-span-3"></div>

        <div
          className="grid grid-cols-4 gap-4 col-span-12 lg:col-span-6 bg-white min-h-screen p-12"
          style={{ marginTop: "20%" }}
        >
          <h2 className="italic col-span-3">
            Par {gardenData?.user?.fist_name} {gardenData?.user?.last_name}
          </h2>

          <Button
            content={IconPen}
            classNames={[
              "h-20",
              "w-20",
              "flex",
              "items-center",
              "justify-center",
              "justify-self-end",
              "p-2",
              "col-span-1",
              "bg-blue-dark",
              "text-white",
              "text-center",
              "rounded-full",
              "hover-animate-bounce",
            ]}
            onclick={() => setIsAmmendable()}
          />

          {isAmmendable ? (
            <input
              type="text"
              className="col-span-4"
              value={gardenData?.garden?.name}
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                paddingTop: "2rem",
                paddingBottom: "2rem",
              }}
            />
          ) : (
            <h1 className="col-span-4 text-center my-8">
              {gardenData?.garden?.name.toUpperCase()}
            </h1>
          )}

          <div className="col-span-4 main-data-container flex flex-wrap justify-between mt-8">
            {isAmmendable ? (
              <>
                <Select
                  icon={IconLabel}
                  prompter="Quel est le type de votre jardin ?"
                  options={[
                    { value: 1, text: "urbain" },
                    { value: 2, text: "rural" },
                  ]}
                  selectedOption={(value) => console.log(value)}
                />
                <Select
                  icon={IconClimate}
                  prompter=" Quel est votre climat ?"
                  options={[]}
                  selectedOption={(value) => console.log(value)}
                />

                <Input
                  id={"garden-location"}
                  type={"text"}
                  name={"garden-location"}
                  value={gardenData?.location?.name}
                  onInput={(value) => handleChangeGardenLocation(value)}
                  placeHolder={"Où se trouve votre jardin ?"}
                  classNames={["w-full"]}
                />

                <SliderInput
                  classNames={["my-4"]}
                  label="Modifier l'opacité de la photo d'arrière plan :"
                  opacityValue={(value) => handleOpacityValue(value)}
                />
              </>
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

          <div className="my-8 col-span-4">
            <h3 className="my-4">Description :</h3>

            {isAmmendable ? (
              <TextArea
                value={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              cursus et mattis pulvinar neque mauris nunc lacinia. Blandit
              quis non eu pretium varius quis enim. Sed eu sit in nulla
              aliquet a. Molestie ut felis suscipit donec nunc mauris. Diam
              sit tempus, interdum blandit nascetur lorem. Arcu dictum sociis
              nec vitae vel et leo, cum. Volutpat nullam volutpat non duis
              lectus morbi sed. Cras gravida lectus sapien porttitor duis. Ac,
              ut viverra consectetur ac est. Sed blandit neque nulla
              pellentesque in vestibulum eget. Elit nec quis eget elementum
              nulla pellentesque nibh dictum elementum.`}
                rows="10"
                id="garden-description"
                name="garden-description"
                classNames={["w-full border-gray-500"]}
              />
            ) : (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                cursus et mattis pulvinar neque mauris nunc lacinia. Blandit
                quis non eu pretium varius quis enim. Sed eu sit in nulla
                aliquet a. Molestie ut felis suscipit donec nunc mauris. Diam
                sit tempus, interdum blandit nascetur lorem. Arcu dictum sociis
                nec vitae vel et leo, cum. Volutpat nullam volutpat non duis
                lectus morbi sed. Cras gravida lectus sapien porttitor duis. Ac,
                ut viverra consectetur ac est. Sed blandit neque nulla
                pellentesque in vestibulum eget. Elit nec quis eget elementum
                nulla pellentesque nibh dictum elementum.
              </p>
            )}
          </div>

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
                "col-span-4",
                "lg:col-span-2",
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
                "col-span-4",
                "lg:col-span-2",
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
                "col-span-4",
                "lg:col-span-2",
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
                "col-span-4",
                "lg:col-span-2",
              ]}
              onclick={() => handleLike(id)}
            />
          )}

          <div className="my-8 col-span-4">
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
