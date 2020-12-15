import React, { useEffect, useState } from 'react';
import GardenCard from '../components/GardenCard'
import PostCard from '../components/PostCard'
import { useSelector } from "react-redux";
import {getFollowedGardenAndRelatedData} from "../requests/gardens"
import {findUserDatas} from "../requests/user"

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [followedGardens, setFollowedGardens] = useState([]);
  const [posts, setPosts] = useState([]);
  const current_user = useSelector(state=>state.current_user);

  useEffect(() => {
    const fetchPageDatas = async () => {
      const fetchUser = await findUserDatas(current_user.id);
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


  return (
    <>
    <div className="flex flex-wrap justify-around">
      <section id="user-informations" className="radius bg-light-brown shadow-neomorph p-4 overflow-auto flex flex-col">
        <img src=
        { current_user.avatar_url?
            current_user.avatar_url
          :
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80"
        } 
          className="avatar-img self-center"
        />
        <h1 className="text-center">Mes informations</h1>
        <form id="edit-user-informations">
          <div className="flex flex-wrap justify-around">
            <input id="first-name" type="text" value={current_user.first_name}/>
            <input id="last-name" type="text" value={current_user.last_name} />
          </div>
          <div className="flex justify-around">
            <input id="email" type="email" value={current_user.email} className="w-full m-3" />
          </div>
          <div className="flex flex-wrap justify-around">
            <input id="password" type="password" placeholder="Changer mot de passe" />
            <input id="password-confirmation" type="password" placeholder="Confirmer le mot de passe" />
          </div>
          <div className="flex flex-wrap justify-around">
            <button id="delete-profile">Supprimer mon profil</button>
            <button id="edit-profile">Modifier mes informations</button>
          </div>
        </form>
      </section>

      <section id="followed-gardens" className="flex flex-col">
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
          <h1>Mes jardins favoris</h1>
        </div>

        <div className="gardens">
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
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
          <h1>Mes jardins</h1>
        </div>

        <div className="gardens">
          { gardens?.map((garden) => (
             <GardenCard
              id = {garden.id}
              name = {garden.name}
              picture_url = {garden.picture_url}
              picture_opacity = {garden.picture_opacity}
              user = {current_user}
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

        <div className="posts">
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