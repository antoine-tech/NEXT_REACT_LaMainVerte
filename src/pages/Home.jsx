import React, { useEffect, useState } from "react";
// import { FormattedMessage } from 'react-intl';
import useCurrentUser from "../hooks/useCurrentUser";
import AvatarSlider from "../components/AvatarSlider/index";
import GardenCard from "../components/GardenCard/index";
import SearchEngine from "../components/SearchEngine/index";
import { getUserDatas } from "../requests/user";
import useJwtToken from "../hooks/useJwtToken";
import {
  getFollowedGardenAndRelatedData,
  getGardenSelection,
} from "../requests/gardens";
import PostCard from "../components/PostCard";
import { getPosts } from "../requests/posts";
import { getTestimoniesAndRelatedUsers } from "../requests/testimonies";
import TestimonyCard from "../components/TestimonyCard/index";
import Button from "../components/Button/index";
import useIsLoading from "../hooks/useIsLoading";
import LoadingAnimation from "../components/LoadingAnimation/index";

const Home = () => {
  // current user custom hook to get in relation with redux global state
  const { current_user } = useCurrentUser();
  // custom hook to get/set jwttoken into/fom cookies
  const { getJwtToken } = useJwtToken();
  // custom hook to check wether the page is loading
  const { isLoading, setIsLoading } = useIsLoading();

  // Component s states
  const [followedGardens, setFollowedGardens] = useState([]);
  const [gardenSelection, setGardenSelection] = useState([]);
  const [lastPosts, setLastPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    const fetchPageDatas = async () => {
      const testimonies = await getTestimoniesAndRelatedUsers();
      setTestimonies(testimonies);

      const posts = await getPosts();
      setLastPosts(posts);

      const userProfile = await getUserDatas(getJwtToken).then((res) =>
        res.json()
      );

      if (
        userProfile?.hasOwnProperty("follows") &&
        userProfile.follows.length > 0
      ) {
        const userFollowedGardens = await getFollowedGardenAndRelatedData(
          userProfile.follows
        );
        setFollowedGardens(userFollowedGardens);
      } else {
        const selectedGardens = await getGardenSelection();
        setGardenSelection(selectedGardens);
      }

      if (testimonies.length > 0 && posts.length > 0) {
        setIsLoading(false);
      }
    };

    fetchPageDatas();
  }, []);

  // render
  return isLoading ? (
    <div className="min-h-screen w-full grid grid-cols-12 gap-4">
      <div className="col-span-10 col-start-2 flex flex-col items-center justify-center">
        <LoadingAnimation />
        <h2 className="fixed bottom-8 text-center">
          Veuillez patienter quelques instants,
          <br /> votre mur est en construction ...
        </h2>
      </div>
    </div>
  ) : (
    <section className="grid grid-cols-12 min-h-screen gap-4">
      <div className="hidden md:block md:col-span-1 lg:col-span-2 bg-man relative">
        <div className="fixed h-1/6 flex flex-col justify-around mx-auto p-4">
          <Button
            text="Créer un jardin"
            classNames={[
              "btn",
              "btn-md",
              "bg-blue-dark",
              "text-white",
              "p-4",
              "w-64",
              "col-span-2",
              "lg:col-span-1",
            ]}
          />

          <Button
            text="Mon profil"
            classNames={[
              "btn",
              "btn-md",
              "bg-blue-dark",
              "text-white",
              "p-4",
              "w-64",
              "col-span-2",
              "lg:col-span-1",
            ]}
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 px-4">
        <SearchEngine />
        <h4 className="my-4">Sélectionné pour vous ....</h4>

        <AvatarSlider />

        {followedGardens?.length > 0 ? (
          <>
            <h4 className="my-4">Vos jardins préférés ....</h4>

            {followedGardens.map((followedGarden) => {
              let {
                id,
                name,
                user,
                climate,
                location,
                garden_type,
                created_at,
                updated_at,
              } = followedGarden;
              return (
                <GardenCard
                  key={`garden-card-${id}`}
                  id={id}
                  name={name}
                  user={user}
                  climate={climate}
                  location={location}
                  garden_type={garden_type}
                  created_at={created_at}
                  updated_at={updated_at}
                />
              );
            })}
          </>
        ) : (
          <>
            <h4 className="my-4">Votre aventure commence ici !</h4>

            <div className="h-66vh w-full bg-start-to-grow relative">
              <div className="grid grid-cols-2 gap-4 flex items-center h-full w-full p-4 bg-light-white">
                <Button
                  text="Créer un jardin"
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
                />

                <Button
                  text="Rechecher un jardin"
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
                />
              </div>
            </div>

            <h4 className="my-4"> ....</h4>

            {gardenSelection?.map((garden) => {
              let {
                id,
                name,
                user,
                climate,
                location,
                garden_type,
                created_at,
                updated_at,
              } = garden;

              return (
                <GardenCard
                  key={`garden-card-${id}`}
                  id={id}
                  name={name}
                  user={user}
                  climate={climate}
                  location={location}
                  garden_type={garden_type}
                  created_at={created_at}
                  updated_at={updated_at}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <h4 className="mb-4 text-center">Les derniers posts</h4>
        <div className="h-screen radius bg-light-brown shadow-neomorph p-4 overflow-auto">
          {lastPosts?.map((lastPost) => {
            let {
              id,
              garden_id,
              title,
              content,
              created_at,
              updated_at,
              likes,
            } = lastPost;
            return (
              <PostCard
                key={`post-${id}`}
                id={id}
                title={title}
                content={content}
                likes={likes}
                garden_id={garden_id}
                created_at={created_at}
                updated_at={updated_at}
              />
            );
          })}
        </div>
        <h4 className="my-4 text-center">Les derniers témoignages</h4>
        <div className="h-screen radius bg-light-brown shadow-neomorph p-4">
          {testimonies?.map((testimony) => {
            let { id, content, user, created_at, updated_at } = testimony;
            return (
              <TestimonyCard
                key={`testimony-${id}`}
                id={id}
                user={user}
                content={content}
                created_at={created_at}
                updated_at={updated_at}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
