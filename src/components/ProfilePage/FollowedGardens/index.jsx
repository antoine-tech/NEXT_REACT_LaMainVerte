import React, { useEffect, useState } from "react";
import { findUserDatas } from "../../../requests/user";
import { getFollowedGardenAndRelatedData } from "../../../requests/gardens";
import GardenCard from "../../../components/GardenCard";
import { useSelector } from "react-redux";
import empty_result from "../../../assets/backgrounds/empty_result_2.svg";

const FollowedGardens = ({ user }) => {
  const [followedGardens, setFollowedGardens] = useState([]);
  const [current_user, setCurrentUser] = useState(
    useSelector((state) => state.current_user)
  );

  useEffect(() => {
    const fetchPageDatas = async () => {
      const fetchUser = await findUserDatas(user.id);

      const userFollowedGardens = await getFollowedGardenAndRelatedData(
        fetchUser.follows
      );
      setFollowedGardens(userFollowedGardens);
    };

    user && fetchPageDatas();
  }, []);

  return (
    <section id="followed-gardens" className="bg-white radius p-4 overflow-auto flex flex-col h-full">
      <div className="radius bg-light-brown p-2 ">
        {current_user && current_user.id == user.id ? (
          <h4>Mes jardins favoris</h4>
        ) : (
          <h4>Jardins suivis</h4>
        )}
      </div>

      <div
        className={
          followedGardens?.length > 1 ? "gardens overflow-y-scroll" : "gardens my-auto"
        }
      >
        {followedGardens.length > 0 ? (
          followedGardens?.map((garden) => (
            <GardenCard
              id={garden.id}
              name={garden.name}
              picture_url={garden.picture_url}
              picture_opacity={garden.picture_opacity}
              user={garden.user}
              climate={garden.climate}
              location={garden.location}
              garden_type={garden.garden_type}
              created_at={garden.created_at}
              updated_at={garden.updated_at}
            />
          ))
        ) : (
          <div className="flex  flex-col items-center w-full justify-center my-10">
            <img
              src={empty_result}
              className="h-96 w-96"
              alt="no result found"
            />

            <h4 className="my-4">Rien pour le moment ...</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default FollowedGardens;
