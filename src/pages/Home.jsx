import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import empty_result from "../assets/backgrounds/empty_result.svg";

const Home = () => {
  const [areFiltersDisplayed, setFiltersDisplayed] = useState(false);
  const [isSearchResultDisplayed, setSearchResultDisplayed] = useState(false);
  const { pageStatus, setPageStatus } = usePageStatus("loading");
  const { getJwtToken } = useJwtToken();
  const [followedGardens, setFollowedGardens] = useState([]);
  const [gardenSelection, setGardenSelection] = useState([]);
  const [user, setUser] = useState(useSelector(state=>state.current_user));
  const [lastPosts, setLastPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [displayedGardens, setDisplayedGardens] = useState([]);
  const { current_user } = useCurrentUser();

  useEffect(() => console.log(current_user), [current_user]);

  useEffect(() => {
    const fetchGardenSelection = async () => await getGardenSelection();

    const fetchTestimonies = async () => await getTestimoniesAndRelatedUsers();

    const fetchAndSetPosts = async () => await getPosts();

    const fetchUserProfile = async () => await getUserDatas(getJwtToken);

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
      const fetchedTestimonies = await fetchTestimonies();
      setTestimonies(fetchedTestimonies);

      if (current_user) {
        const userProfile = await fetchUserProfile();
        const followedGarden = await fetchFollowedGarden(userProfile);
        setDisplayedGardens(followedGarden);
      } else {
        const gardenSelection = await fetchGardenSelection();
        setDisplayedGardens(gardenSelection);
      }
      setPageStatus("loaded");
    };

    fetchPageDatas(current_user);
  }, [current_user]);

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
         { current_user &&
         <div className="fixed h-1/6 flex flex-col justify-around mx-auto p-4">
            <Link
              to="/gardens/new"
              className="btn btn-md bg-blue-dark text-white text-center p-4 w-64 col-span-2 lg:col-span-1"
            >
              Créer un jardin
            </Link>

            <Link 
              to="/profile" 
              className = "btn btn-md bg-blue-dark text-white text-center p-4 w-64 col-span-2 lg:col-span-1"
            >
              Mon profil
            </Link>
          </div>
          }
        </div>
        <div className="col-span-12 lg:col-span-6 px-4" id="wall">
          <SearchEngine
            getSearchResult={(gardens) => setDisplayedGardens(gardens)}
            filterDisplay={areFiltersDisplayed}
            getFilterDisplayed={(value) => setFiltersDisplayed(value)}
            setSearchResultDisplayed={(value) =>
              setSearchResultDisplayed(value)
            }
          />
          <h4 className="my-4">Sélectionné pour vous ...</h4>

          <AvatarSlider />

          {isSearchResultDisplayed ? (
            <>
              {displayedGardens.length > 0 ? (
                <h4 className="my-4"> Resultat de la recherche...</h4>
              ) : (
                <div className="flex flex-col items-center w-full justify-center my-10">
                  <h4 className="my-4">
                    Pas de resultat pour votre recherche ...
                  </h4>
                  <img
                    src={empty_result}
                    className="h-96 w-96"
                    alt="no result found"
                  />
                </div>
              )}
            </>
          ) : userProfile.follows?.length > 0 ? (
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

          {displayedGardens?.map((displayedGarden) => {
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
