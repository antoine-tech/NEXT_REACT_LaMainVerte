import React from "react";
import EditProfileForm from "../../Forms/EdiProfileForm";

const UserInformations = ({user}) => {

    return (
        <section id="user-informations" className="radius bg-light-brown shadow-neomorph p-4 overflow-auto flex flex-col">
            <EditProfileForm current={user}/>  
        </section>
    )
}

export default UserInformations;