import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import useJwtToken from "../../../hooks/useJwtToken";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { uploadToAWS } from "../../../sevices/Api";
import { useDropzone } from "react-dropzone";
import {editUserProfile, removeProfile} from "../../../requests/user";
import Input from "../../base_components/Input";

const EditProfileForm = ({current}) => {
    const [user, setUser] = useState(current);
    const [avatar_url, setAvatarUrl] = useState(user.avatar_url);
    const [displayErrors, setDisplayErrors] = useState(false);
    const [droppedImage, setDroppedImage] = useState();
    const { getJwtToken } = useJwtToken();
    const history = useHistory()
    const {setCurrentUser} = useCurrentUser();
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
      
        let email = !formData.get("email")? user.email : formData.get("email");
        let first_name = !formData.get("first_name")? user.first_name : formData.get("first_name") ;
        let username = !formData.get("username")? user.username : formData.get("username");
        let last_name = !formData.get("last_name")? user.last_name : formData.get("last_name");
        let password = formData.get("password");
        let password_confirmation = formData.get("password_confirmation");
        
        if(!password || !password_confirmation || password != password_confirmation) {
          setDisplayErrors(true);
          return;
        }
    
        let avatar_url = droppedImage
        ? await uploadToAWS(getJwtToken, droppedImage[0], "la-main-verte")
        : "";
    
        if(!avatar_url) avatar_url = user.avatar_url;
        
      
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
          setUser(response)
          setCurrentUser(response);
        } else {
          console.error("mauvaises entrées");
        }
      }

    const deleteProfile = async () => {
    let answer = window.confirm(
        "Êtes vous sûr de vouloir supprimer votre compte ?\nToutes vos données seront perdues, il vous sera impossible de les récupérer"
    );
    
        if(answer) {
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
    }

    useEffect(() => {
        if(!droppedImage) return;
    
        setAvatarUrl(droppedImage[0].preview)
      }, [droppedImage])

    return (
        <form id="edit-user-informations" onSubmit={editUserInformations}>

            <div className="img justify-center" id="upload-avatar" {...getRootProps()}>
                <img src=
                { avatar_url?
                    avatar_url
                :
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
                } 
                className="avatar-img" 
                />
                <button id="picture-img" title="Uploader un nouvel avatar">
                <img src="https://www.flaticon.com/svg/static/icons/svg/565/565760.svg"/>
                <input type="file" name="avatar" {...getInputProps()}/>
                </button>
            </div>
            
            <h1 className="text-center">Mes informations</h1>
            { displayErrors &&
            <p className="text-red-400 text-center" onClick={() => setDisplayErrors(false)}>
                - Erreur lors de la saisie des mots de passe
            </p>
            }
            { droppedImage && 
                <p className="text-center">{`avatar uploadé: ${droppedImage[0].name}`}</p>
            }
            <div className="flex justify-around">
                <Input
                    id = "username"
                    type = "text"
                    name = "username"
                    placeHolder = {user.username}
                    classNames = {["w-full m-3"]}
                />
            </div>
            <div className="flex flex-wrap justify-around">
                <Input
                    id = "first-name"
                    type = "text"
                    name = "first-name"
                    placeHolder = {user.first_name}
                />

                <Input
                    id = "last-name"
                    type = "text"
                    name = "last-name"
                    placeHolder = {user.last_name}
                />
            </div>
            <div className="flex justify-around">
                <Input
                    id = "email"
                    type = "email"
                    name = "email"
                    placeHolder = {user.email}
                    classNames = {["w-full m-3"]}
                />
            </div>
            <div className="flex flex-wrap justify-around">
                <Input
                    id = "password"
                    type = "password"
                    name = "password"
                    placeHolder = "Mot de passe"
                />

                <Input
                    id = "password_confirmation"
                    type = "password"
                    name = "password_confirmation"
                    placeHolder = "Confirmer le mot de passe"
                />
            </div>

            <div className="flex flex-wrap justify-around">
                <button id="delete-profile" onClick={deleteProfile}>Supprimer mon profil</button>
                <button id="edit-profile" type="submit">Modifier mes informations</button>
            </div>

        </form>
    )
}

export default EditProfileForm;