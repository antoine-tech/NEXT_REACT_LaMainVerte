import React, { useState } from "react";
import Input from "../../base_components/Input";
import ProfileAvatar from "../../ProfileAvatar";

const PublicInformations = ({ other_user }) => {
  const [user, setUser] = useState(other_user);
  const [avatar_url, setAvatarUrl] = useState(user.avatar_url);

  return (
    <section
      id="edit-user-informations"
      className="bg-white radius p-4 overflow-auto flex flex-col h-full"
    >
      <ProfileAvatar avatar_url={avatar_url} />
      <h1 className="text-center my-4">Profil de {user.username}</h1>
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
  );
};

export default PublicInformations;
