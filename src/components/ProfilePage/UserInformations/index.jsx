import React, { useEffect, useState } from "react";
import EditProfileForm from "../../Forms/EdiProfileForm";
import { useSelector } from "react-redux";
import PublicInformations from "../PublicInformations";

const UserInformations = ({user}) => {
    const [current_user, setCurrentUser] = useState(useSelector(state=>state.current_user));

    return (
        <section id="user-informations" className="radius bg-light-brown shadow-neomorph p-2  overflow-auto flex flex-col">
            {   current_user && current_user.id === user.id ?
                    <EditProfileForm current={user}/>
                :
                    <PublicInformations other_user={user} />
            }  
        </section>
    )
}

export default UserInformations;