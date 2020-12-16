import React, {useEffect, useState} from "react";
import {findUserDatas} from "../../../requests/user";
import {getFollowedGardenAndRelatedData} from "../../../requests/gardens";
import GardenCard from '../../../components/GardenCard';

const FollowedGardens = ({user}) => {
    const [followedGardens, setFollowedGardens] = useState([]);
    
    useEffect(() => {

        const fetchPageDatas = async () => {
    
          const fetchUser = await findUserDatas(user.id);
    
          const userFollowedGardens = await getFollowedGardenAndRelatedData(
            fetchUser.follows
          );
          setFollowedGardens(userFollowedGardens);
        };
    
        user && fetchPageDatas();
      }, [])

    return (
        <section id="followed-gardens" className="flex flex-col">
            <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
                <h1>Mes jardins favoris</h1>
            </div>

            <div className={followedGardens?.length > 1? "gardens overflow-y-scroll" : "gardens"}>
            { followedGardens?.map((garden) => (
                <GardenCard
                    id = {garden.id}
                    name = {garden.name}
                    picture_url = {garden.picture_url}
                    picture_opacity = {garden.picture_opacity}
                    user = {garden.user}
                    climate = {garden.climate}
                    location = {garden.location}
                    garden_type = {garden.garden_type}
                    created_at = {garden.created_at}
                    updated_at = {garden.updated_at}
                />
            ))

            }
            
            </div>
        </section>
    )
}

export default FollowedGardens;