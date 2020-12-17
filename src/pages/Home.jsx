import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUserDatas, getUsers } from "../requests/user";
import { getGardens } from "../requests/gardens";
import { getPosts } from "../requests/posts";
import { getTestimonies } from "../requests/testimonies";
import useCurrentUser from "../hooks/useCurrentUser";
import usePageStatus from "../hooks/usePageStatus";
import AvatarSlider from "../components/AvatarSlider/index";
import GardenCard from "../components/GardenCard/index";
import SearchEngine from "../components/SearchEngine/index";
import useJwtToken from "../hooks/useJwtToken";
import PostCard from "../components/PostCard";
import TestimonyCard from "../components/TestimonyCard/index";
import empty_result from "../assets/backgrounds/empty_result.svg";
import LoadingAnimation from "../components/loaders/LoadingAnimation/index";
import Button from "../components/base_components/Button/index";


const Home = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [sliderData, setSLiderData] = useState(null);
  const [areFiltersDisplayed, setFiltersDisplayed] = useState(false);
  const [isSearchResultDisplayed, setSearchResultDisplayed] = useState(false);
  const [lastPosts, setLastPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [displayedGardens, setDisplayedGardens] = useState([]);
  const { pageStatus, setPageStatus } = usePageStatus("loading");
  const { getJwtToken } = useJwtToken();
  const { current_user } = useCurrentUser();

  useEffect(() => {
    const fetchTestimonies = async () => await getTestimonies();
    const fetchAndSetPosts = async () => await getPosts();
    const fetchUserProfile = async () =>
      await getUserDatas(getJwtToken, currentPage);

    const fetchPageDatas = async (current_user) => {
      const fetchedPosts = await fetchAndSetPosts();
      setLastPosts(fetchedPosts);
      const fetchedTestimonies = await fetchTestimonies();
      setTestimonies(fetchedTestimonies);

      if (current_user) {
        const userProfile = await fetchUserProfile();
        setSLiderData(userProfile.selected_users);
        const followedGarden = userProfile.follows.length
          ? userProfile.follows
          : await getGardens();
        setDisplayedGardens(followedGarden);
        setCurrentPage(1);
      } else {
        const gardenSelection = await getGardens();
        setDisplayedGardens(gardenSelection);
        const users = await getUsers();
        setSLiderData(users);
      }
      setPageStatus("loaded");
    };

    fetchPageDatas(current_user);
  }, [current_user]);

  const handleClickLoadMoreButton = async () => {
    if (current_user)
    {const userData = await getUserDatas(getJwtToken, currentPage + 1);
    setDisplayedGardens([...displayedGardens, ...userData.follows]);
    setCurrentPage(currentPage + 1);}else{
      history.push('/login')
    }
  };

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
          {current_user && (
            <div className="fixed h-1/6 flex flex-col justify-around mx-auto p-4">
              <Link
                to="/gardens/new"
                className="btn btn-md bg-blue-dark text-white text-center p-4 w-64 col-span-2 lg:col-span-1"
              >
                Créer un jardin
              </Link>

              <Link
                to="/profile"
                className="btn btn-md bg-blue-dark text-white text-center p-4 w-64 col-span-2 lg:col-span-1"
              >
                Mon profil
              </Link>
            </div>
          )}
        </div>
        <div
          className="flex flex-col justify-center col-span-12 lg:col-span-6 px-4"
          id="wall"
        >
          <SearchEngine
            getSearchResult={(gardens) => setDisplayedGardens(gardens)}
            filterDisplay={areFiltersDisplayed}
            getFilterDisplayed={(value) => setFiltersDisplayed(value)}
            setSearchResultDisplayed={(value) =>
              setSearchResultDisplayed(value)
            }
          />
          <h4 className="my-4">Sélectionné pour vous ...</h4>

          <AvatarSlider sliderData={sliderData} />

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
                  <Link
                    to="/gardens/new"
                    className="btn btn-lg bg-blue-dark text-white p-4 w-full col-span-2 lg:col-span-1 text-center"
                  >
                    Créer un jardin
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-lg bg-blue-dark text-white p-4 w-full col-span-2 lg:col-span-1 text-center"
                  >
                    Rechercher un jardin
                  </Link>
                </div>
              </div>

              <h4 className="my-4"> De merveilleux jardins à découvir...</h4>
            </>
          )}

          {displayedGardens?.map((displayedGarden) => {
            return (
              <GardenCard
                key={`garden-${displayedGarden.id}`}
                id={displayedGarden.id}
              />
            );
          })}

        
            <Button
              classNames={[
                "btn btn-md bg-red mb-4 text-white text-center p-8 w-5/6 align-self-center justify-self-center mx-auto",
              ]}
              text="VOIR PLUS DE JARDINS"
              onclick={handleClickLoadMoreButton}
            />
      
        </div>
        <div className="hidden lg:block lg:col-span-4">
          <h4 className="mb-4 text-center">Les derniers posts</h4>
          <div className="h-screen radius bg-light-brown shadow-neomorph p-4 overflow-auto">
            {lastPosts?.map((lastPost) => {
              let { id } = lastPost;
              return <PostCard key={`post-${id}`} id={id} />;
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
