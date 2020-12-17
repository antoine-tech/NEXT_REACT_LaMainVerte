import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useJwtToken from "../../../hooks/useJwtToken";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { uploadToAWS } from "../../../sevices/Api";
import { useDropzone } from "react-dropzone";
import { editUserProfile, removeProfile } from "../../../requests/user";
import Input from "../../base_components/Input";
import Button from "../../base_components/Button/index";
import FormGroup from '../../FormGroup/index';

const EditProfileForm = ({ current }) => {
  const [user, setUser] = useState(current);
  const [avatar_url, setAvatarUrl] = useState(user.avatar_url);
  const [displayErrors, setDisplayErrors] = useState(false);
  const [droppedImage, setDroppedImage] = useState();
  const { getJwtToken } = useJwtToken();
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedImages) => {
      return setDroppedImage(
        acceptedImages.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const editUserInformations = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    let email = !formData.get("email") ? user.email : formData.get("email");
    let first_name = !formData.get("first_name")
      ? user.first_name
      : formData.get("first_name");
    let username = !formData.get("username")
      ? user.username
      : formData.get("username");
    let last_name = !formData.get("last_name")
      ? user.last_name
      : formData.get("last_name");
    let password = formData.get("password");
    let password_confirmation = formData.get("password_confirmation");

    if (
      !password ||
      !password_confirmation ||
      password != password_confirmation
    ) {
      setDisplayErrors(true);
      return;
    }

    let avatar_url = droppedImage
      ? await uploadToAWS(getJwtToken, droppedImage[0], "la-main-verte")
      : "";

    if (!avatar_url) avatar_url = user.avatar_url;

    const response = await editUserProfile(
      first_name,
      last_name,
      username,
      email,
      avatar_url,
      password,
      password_confirmation,
      user.id,
      Cookies.get("jwt_token")
    ).then((res) => {
      return res.json();
    });

    if (response.id) {
      setUser(response);
      setCurrentUser(response);
    } else {
      console.error("mauvaises entrées");
    }
  };

  const deleteProfile = async () => {
    let answer = window.confirm(
      "Êtes vous sûr de vouloir supprimer votre compte ?\nToutes vos données seront perdues, il vous sera impossible de les récupérer"
    );

    if (answer) {
      const response = await removeProfile(
        user.id,
        Cookies.get("jwt_token")
      ).then((res) => {
        setCurrentUser(null);
        Cookies.remove("jwt_token");
        history.push("/");
        return res.json();
      });
    }
  };

  useEffect(() => {
    if (!droppedImage) return;

    setAvatarUrl(droppedImage[0].preview);
  }, [droppedImage]);

  return (
    <form id="edit-user-informations" onSubmit={editUserInformations}>
      <div id="upload-avatar" {...getRootProps()}>
        <img
          src={
            avatar_url
              ? avatar_url
              : "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
          }
          className="avatar-img mx-auto"
          alt="avatar"
        />
        <button id="picture-img" title="Uploader un nouvel avatar">
          <input type="file" name="avatar" {...getInputProps()} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">

      <h4 className="text-center col-span-2">Mes informations</h4>
      {displayErrors && (
        <p
          className="text-red-400 text-center"
          onClick={() => setDisplayErrors(false)}
        >
          - Erreur lors de la saisie des mots de passe
        </p>
      )}
      {droppedImage && (
        <p className="text-center">{`avatar uploadé: ${droppedImage[0].name}`}</p>
      )}
        <FormGroup
          labelText="Identifiant"
          id="username"
          type="text"
          name="username"
          placeHolder={user.username}
          colSpan={2}
        />

        <FormGroup
          labelText="Prénom"
          id="first-name"
          type="text"
          name="first-name"
          placeHolder={user.first_name}
          colSpan={2}
        />

        <FormGroup
          labelText="Nom"
          id="last-name"
          type="text"
          name="last-name"
          placeHolder={user.last_name}
          colSpan={2}
        />

        <FormGroup
          labelText="Adresse email"
          id="email"
          type="email"
          name="email"
          placeHolder={user.email}
          colSpan={2}
        />

        <FormGroup
          labelText="Mot de passe"
          id="password"
          type="password"
          name="password"
          placeHolder="Mot de passe"
          colSpan={2}
        />

        <FormGroup
          labelText="Confirmer le mot de passe"
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          placeHolder="Confirmer le mot de passe"
          colSpan={2}
        />

        <Button
          text="Supprimer mon profil"
          onclick={deleteProfile}
          id="delete-profile"
          classNames={[
            "btn btn-lg bg-blue-dark text-white p-2 my-2 w-full col-span-2 lg:col-span-1 text-center",
          ]}
        />

        <Button
          type="submit"
          text="Modifier mes informations"
          onclick={deleteProfile}
          id="edit-profile"
          classNames={[
            "btn btn-lg bg-blue-dark text-white p-2 my-2 w-full col-span-2 lg:col-span-1 text-center",
          ]}
        />
      </div>
    </form>
  );
};

export default EditProfileForm;
