import React, { useState } from "react";
import Input from "../../Input";

const PublicInformations = ({other_user}) => {
    const [user, setUser] = useState(other_user);
    const [avatar_url, setAvatarUrl] = useState(user.avatar_url);

    return (
        <section id="edit-user-informations">

            <div className="img justify-center" id="user-avatar">
                <img src=
                { avatar_url?
                    avatar_url
                :
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
                } 
                className="avatar-img" 
                />
            </div>
            
            <h1 className="text-center">Profil de {user.username}</h1>
            <div className="flex justify-between p-5 mx-5">
                <h4>Nom d'utilisateur: </h4>
                <bold>{user.username}</bold>
            </div>
            <div className="flex justify-between p-5 mx-5">
                <h4>Prénom: </h4>
                <bold>{user.first_name}</bold>
            </div>
            <div className="flex justify-between p-5 mx-5">
                <h4>Nom de famille: </h4>
                <bold>{user.last_name}</bold>
            </div>

        </section>

    )
}

export default PublicInformations;