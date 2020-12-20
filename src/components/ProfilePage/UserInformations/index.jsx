import React, { useEffect, useState } from "react";
import EditProfileForm from "../../Forms/EditProfileForm";
import { useSelector } from "react-redux";
import PublicInformations from "../PublicInformations";

const UserInformations = ({user}) => {
    const [current_user, setCurrentUser] = useState(useSelector(state=>state.current_user));

    return (
        <section id="user-informations" className="bg-white radius p-4 overflow-auto flex flex-col h-full">
            {   current_user && current_user.id === user.id ?
                    <EditProfileForm current={user}/>
                :
                    <PublicInformations other_user={user} />
            }  
        </section>
    )
}

export default UserInformations;