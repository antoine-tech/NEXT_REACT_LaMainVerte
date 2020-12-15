import React, { useEffect, useState } from "react";
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
import LoadingAnimation from "../components/LoadingAnimation/index";
import useCurrentUser from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";
import usePageStatus from "../hooks/usePageStatus";
// import useMutationObserver from "../hooks/useMutationObserver";
// import useInstantMessages from "../hooks/useIntantMessages";

const Home = () => {
  const { pageStatus, setPageStatus } = usePageStatus("loading");
  const { getJwtToken } = useJwtToken();
  const [lastPosts, setLastPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [displayedGardens, setDisplayedGardens] = useState([]);
  // const viewItems = useMutationObserver();
  // const { instantMessages, sendInstantMessage } = useInstantMessages();

  const { current_user } = useCurrentUser();

  useEffect(() => {
    const fetchGardenSelection = async () => await getGardenSelection();

    const fetchAndSetTestimonies = async () =>
      await getTestimoniesAndRelatedUsers();

    const fetchAndSetPosts = async () => await getPosts();

    const fetchAndSetUserProfile = async () =>
      await getUserDatas(getJwtToken).then((res) => res.json());

    const fetchFollowedGarden = async (userProfile) => {
      const userFollowedGardens = await getFollowedGardenAndRelatedData(
        userProfile.follows
      );

      if (userFollowedGardens.length) {
        return userFollowedGardens;
      } else {
        return await fetchGardenSelection();
      }
    };

    const fetchPageDatas = async (current_user) => {
      const fetchedPosts = await fetchAndSetPosts();
      setLastPosts(fetchedPosts);
      const fetchedTestimonies = await fetchAndSetTestimonies();
      setTestimonies(fetchedTestimonies);

      if (current_user) {
        const userProfile = await fetchAndSetUserProfile();
        const followedGarden = await fetchFollowedGarden(userProfile);
        setDisplayedGardens(followedGarden);
      } else {
        const gardenSelection = await fetchGardenSelection();
        setDisplayedGardens(gardenSelection);
      }
      setPageStatus("loaded");
    };

    fetchPageDatas(current_user);
    
  }, []);

  if (pageStatus === "loading") {
    return (
      <div className="min-h-screen w-full grid grid-cols-12 gap-4">
        <div className="col-span-10 col-start-2 flex flex-col items-center justify-center">
          <LoadingAnimation />
          <h2 className="fixed bottom-8 text-center">
            Veuillez patienter quelques instants,
            <br /> votre mur est en construction ...
          </h2>
        </div>
      </div>
    );
  } else if (pageStatus === "loaded") {
    return (
      <section className="grid grid-cols-12 min-h-screen gap-4">
        <div className="hidden md:block md:col-span-1 lg:col-span-2 bg-man relative">
          <div className="fixed h-1/6 flex flex-col justify-around mx-auto p-4">
            <Link
              to="/gardens/new"
              className="btn btn-md bg-blue-dark text-white text-center p-4 w-64 col-span-2 lg:col-span-1"
            >
              Créer un jardin
            </Link>

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

            {/* <button
            onClick={() => sendInstantMessage({ message: "hello world" })}
            className="btn btn-md bg-blue-dark text-white p-4 w-64 col-span-2 lg:col-span-1"
          >
            TEST WS
          </button> */}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 px-4" id="wall">
          <SearchEngine getSearchResult={(gardens) => setDisplayedGardens(gardens)} />
          <h4 className="my-4">Sélectionné pour vous ...</h4>

          <AvatarSlider />

          {userProfile.follows?.length > 0 ? (
            <>
              <h4 className="my-4">Vos jardins préférés ...</h4>
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

              <h4 className="my-4"> De merveilleux jardin à découvir...</h4>
            </>
          )}

          {displayedGardens.map((displayedGarden) => {
            let {
              id,
              name,
              user,
              climate,
              location,
              garden_type,
              picture_url,
              picture_opacity,
              created_at,
              updated_at,
            } = displayedGarden;
            return (
              <GardenCard
                key={`garden-${id}`}
                id={id}
                name={name}
                picture_url={picture_url}
                picture_opacity={picture_opacity}
                user={user}
                climate={climate}
                location={location}
                garden_type={garden_type}
                created_at={created_at}
                updated_at={updated_at}
              />
            );
          })}
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
  } else if (pageStatus === "error") {
    // error
  }
};

export default Home;
