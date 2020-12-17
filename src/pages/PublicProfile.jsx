import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import UserInformations from "../components/ProfilePage/UserInformations";
import FollowedGardens from "../components/ProfilePage/FollowedGardens";
import UserGardens from "../components/ProfilePage/UserGardens";
import UserPosts from "../components/ProfilePage/UserPosts";
import {findUserDatas} from "../requests/user";

const PublicProfile = () => {;
    const { user_id } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
          const fetched_user = await findUserDatas(user_id);
          setUser(fetched_user.user);
        };
    
        fetchUserData();
    }, []);

  return (
    <div className="Profile page">
      { user &&
        <div>
            <div className="flex flex-wrap justify-around">
                <UserInformations user={user}/>
                
                <FollowedGardens user={user} />
            </div>

            <div className="flex flex-wrap justify-around">
                <UserGardens user={user} />

                <UserPosts user={user} />
            </div>
        </div>
      }
    </div>
  )
}

export default PublicProfile;