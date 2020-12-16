import React, { useState } from 'react';
import { useSelector } from "react-redux";
import UserInformations from "../components/ProfilePage/UserInformations"
import FollowedGardens from "../components/ProfilePage/FollowedGardens"
import UserGardens from "../components/ProfilePage/UserGardens"
import UserPosts from "../components/ProfilePage/UserPosts"

const Profile = () => {;
  const [user, setUser] = useState(useSelector(state=>state.current_user));

  return (
    <div className="Profile page">
      <div className="flex flex-wrap justify-around">
        <UserInformations user={user && user}/>
        
        <FollowedGardens user={user && user} />
      </div>

      <div className="flex flex-wrap justify-around">
        <UserGardens user={user} />

        <UserPosts user={user && user} />
      </div>
    </div>
  )
}

export default Profile;