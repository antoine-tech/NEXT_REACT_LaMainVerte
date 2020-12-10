import React, { useEffect, useState } from "react";
// import { FormattedMessage } from 'react-intl';
import useCurrentUser from "../hooks/useCurrentUser";
import AvatarSlider from "../components/AvatarSlider/index";
import GardenCard from "../components/GardenCard/index";
import SearchEngine from "../components/SearchEngine/index";
import { findUserDatas, getUserDatas } from "../requests/user";
import useJwtToken from "../hooks/useJwtToken";
import { getClimate, getGardenType, getLocation } from "../requests/gardens";
import PostCard from "../components/PostCard";
import { getPosts } from "../requests/posts";
import { getTestimonies } from "../requests/testimonies";
import TestimonyCard from "../components/TestimonyCard/index";

const Home = () => {
  // current user custom hook to get in relation with redux global state
  const { current_user } = useCurrentUser();
  const { getJwtToken } = useJwtToken();
  const [followedGardens, setFollowedGardens] = useState([]);
  const [lastPosts, setLastPosts] = useState([]);
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    const fetchPageDatas = async () => {
      // fetching testimonies
      const testimonyDatas = await getTestimonies();

      // accessing testimony users 
      const testimonyUsersPromises = await testimonyDatas.map((testimony) => {
        return findUserDatas(testimony.user_id);
      });

      const testimonyUsers = await Promise.all(testimonyUsersPromises).then(
        (testimonyUser) => testimonyUser
      );

      const testimonies = testimonyDatas.map((testimony, index) => {
        return {
          ...testimony,
          user: testimonyUsers[index]?.user,
        };
      });

      // fetching posts
      const posts = await getPosts();
      const gardens = await getUserDatas(getJwtToken).then((res) => res.json());
      if (gardens?.hasOwnProperty("follows")) {
        // fetching related garden climates to gardens that user is currently following
        const promisesRelatedClimates = gardens.follows.map((garden) =>
          getClimate(garden.climate_id)
        );

        const relatedClimates = await Promise.all(promisesRelatedClimates).then(
          (relatedClimate) => relatedClimate
        );

        // fetching related garden locations to gardens that user is currently following
        const promisesRelatedLocations = await gardens.follows.map((garden) =>
          getLocation(garden.location_id)
        );

        const relatedLocations = await Promise.all(
          promisesRelatedLocations
        ).then((relatedLocation) => relatedLocation);

        // fetching related garden types to gardens that user is currently following
        const promisesRelatedGardenTypes = await gardens.follows.map((garden) =>
          getGardenType(garden.garden_type_id)
        );

        const relatedGardenTypes = await Promise.all(
          promisesRelatedGardenTypes
        ).then((relatedGardenType) => relatedGardenType);

        // fetching related garden types to gardens that user is currently following
        const promisesRelatedUsers = await gardens.follows.map((garden) =>
          findUserDatas(garden.user_id)
        );

        const relatedUsers = await Promise.all(promisesRelatedUsers).then(
          (user) => user
        );

        // constructing final object grouping all datas

        const currentUserfollowedGardens = gardens.follows.map(
          (garden, index) => {
            let { id, name, created_at, updated_at } = garden;
            return {
              id,
              name,
              updated_at,
              created_at,
              climate: relatedClimates[index],
              location: relatedLocations[index],
              garden_type: relatedGardenTypes[index],
              user: relatedUsers[index]?.user,
            };
          }
        );
        setTestimonies(testimonies);
        setLastPosts(posts);
        setFollowedGardens(currentUserfollowedGardens);
      } else {
        console.error("Network error fetching ressource");
      }
    };

    fetchPageDatas();
  }, []);

  // render
  return (
    <section className="grid grid-cols-12 min-h-screen gap-4">
      <div className="hidden md:block md:col-span-1 lg:col-span-2 bg-man"></div>
      <div className="col-span-12 lg:col-span-6 px-4">
        <SearchEngine />
        <h4 className="my-4">Sélectionné pour vous ....</h4>

        <AvatarSlider />

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

        <GardenCard />
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
            } = lastPost;
            return (
              <PostCard
                key={`post-${id}`}
                id={id}
                title={title}
                content={content}
                garden_id={garden_id}
                created_at={created_at}
                updated_at={updated_at}
              />
            );
          })}
        </div>
        <h4 className="my-4 text-center">Les posts les plus commentés</h4>
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
