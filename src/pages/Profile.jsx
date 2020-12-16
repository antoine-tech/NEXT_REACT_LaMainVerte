import React, { useEffect, useState } from 'react';
import GardenCard from '../components/GardenCard';
import PostCard from '../components/PostCard';
import { useSelector } from "react-redux";
import {getFollowedGardenAndRelatedData} from "../requests/gardens";
import {findUserDatas, editUserProfile, removeProfile} from "../requests/user";
import useCurrentUser from "../hooks/useCurrentUser";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { uploadToAWS } from "../sevices/Api";
import useJwtToken from "../hooks/useJwtToken";

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [followedGardens, setFollowedGardens] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(useSelector(state=>state.current_user));
  const [avatar_url, setAvatarUrl] = useState(user.avatar_url);
  const {setCurrentUser} = useCurrentUser();
  const [droppedImage, setDroppedImage] = useState();
  const { getJwtToken } = useJwtToken();
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
    
    if(!password) return
    if(!password_confirmation) return

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
      return res.json();
    });
    }
  }

  useEffect(() => {

    const fetchPageDatas = async () => {

      const fetchUser = await findUserDatas(user.id);
      setPosts(fetchUser.posts);

      const userFollowedGardens = await getFollowedGardenAndRelatedData(
        fetchUser.follows
      );
      setFollowedGardens(userFollowedGardens);

      const userGardens = await getFollowedGardenAndRelatedData(
        fetchUser.gardens
      );
      setGardens(userGardens)
    };

    fetchPageDatas();
  }, [])

  useEffect(() => {
    if(!droppedImage) return;

    setAvatarUrl(droppedImage[0].preview)
  }, [droppedImage])


  return (
    <>
    <div className="flex flex-wrap justify-around">
      <section id="user-informations" className="radius bg-light-brown shadow-neomorph p-4 overflow-auto flex flex-col">
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
        { droppedImage && 
            <p className="text-center">{`avatar uploadé: ${droppedImage[0].name}`}</p>
        }
        <div className="flex justify-around">
            <input name="username" type="text" placeholder={user.username} className="w-full m-3"/>
          </div>
          <div className="flex flex-wrap justify-around">
            <input name="first_name" type="text" placeholder={user.first_name}/>
            <input name="last_name" type="text" placeholder={user.last_name}  />
          </div>
          <div className="flex justify-around">
            <input name="email" type="email" placeholder={user.email} className="w-full m-3"/>
          </div>
          <div className="flex flex-wrap justify-around">
            <input name="password" type="password" placeholder="Changer mot de passe" />
            <input name="password_confirmation" type="password" placeholder="Confirmer le mot de passe" />
          </div>
          <div className="flex flex-wrap justify-around">
            <button id="delete-profile" onClick={deleteProfile}>Supprimer mon profil</button>
            <button id="edit-profile" type="submit">Modifier mes informations</button>
          </div>
        </form>
      </section>

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
    </div>

    <div className="flex flex-wrap justify-around">
      <section id="user-gardens" className="flex flex-col">
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5 flex justify-between">
          <h1>Mes jardins</h1>
          <Link to="/gardens/new" id = "create-garden">
            Créer un nouveau jardin
          </Link>
        </div>

        <div className={gardens?.length > 1? "gardens overflow-y-scroll" : "gardens"}>
          { gardens?.map((garden) => (
             <GardenCard
              id = {garden.id}
              name = {garden.name}
              picture_url = {garden.picture_url}
              picture_opacity = {garden.picture_opacity}
              user = {user}
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

      <section id="user-posts" className="flex flex-col">
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
          <h1>Mes derniers posts</h1>
        </div>

        <div className={posts?.length > 3? "posts overflow-y-scroll" : "posts"}>
          { posts?.map((post) => (
            <PostCard
              id = {post.id}
              title = {post.title}
              content = {post.content}
              garden_id = {post.garden_id}
              created_at = {post.created_at}
              updated_at = {post.updated_at}
              likes = {post.likes}
            />
          ))

          }
        </div>
      </section>
    </div>
    </>
  )
}

export default Profile;