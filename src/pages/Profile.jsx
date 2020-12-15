import React, { useEffect, useState } from 'react';
import GardenCard from '../components/GardenCard'
import PostCard from '../components/PostCard'
import { useSelector } from "react-redux";

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [followedGardens, setFollowedGardens] = useState([]);
  const [posts, setPosts] = useState([]);
  const current_user = useSelector(state=>state.current_user);

  useState(() => {
    setGardens(["test"])
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
          <GardenCard
            id = "3"
            name = "Super Jardin"
            picture_url = "https://images.unsplash.com/photo-1560100653-3d4184a38762?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            picture_opacity = "1.2"
            user = "Jean-Mark BELLEGUEULE"
            climate = "Fait chaud"
            location = "Mars"
            garden_type = "Végétal"
            created_at = "20/05/2002"
            updated_at = "20/08/2020"
          />

          <GardenCard
            id = "3"
            name = "Super Jardin"
            picture_url = "https://images.unsplash.com/photo-1560100653-3d4184a38762?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            picture_opacity = "1.2"
            user = "Jean-Mark BELLEGUEULE"
            climate = "Fait chaud"
            location = "Mars"
            garden_type = "Végétal"
            created_at = "20/05/2002"
            updated_at = "20/08/2020"
          />

          <GardenCard
            id = "3"
            name = "Super Jardin"
            picture_url = "https://images.unsplash.com/photo-1560100653-3d4184a38762?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            picture_opacity = "1.2"
            user = "Jean-Mark BELLEGUEULE"
            climate = "Fait chaud"
            location = "Mars"
            garden_type = "Végétal"
            created_at = "20/05/2002"
            updated_at = "20/08/2020"
          />
        </div>
      </section>
    </div>

    <div className="flex flex-wrap justify-around">
      <section id="user-gardens" className="flex flex-col">
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
          <h1>Mes jardins</h1>
        </div>

        <div className="gardens">
          <GardenCard
            id = "3"
            name = "Super Jardin"
            picture_url = "https://images.unsplash.com/photo-1560100653-3d4184a38762?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            picture_opacity = "1.2"
            user = "Jean-Mark BELLEGUEULE"
            climate = "Fait chaud"
            location = "Mars"
            garden_type = "Végétal"
            created_at = "20/05/2002"
            updated_at = "20/08/2020"
          />
        </div>
       
      </section>

      <section id="user-posts" className="flex flex-col">
        <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
          <h1>Mes derniers posts</h1>
        </div>

        <div className="posts">
          <PostCard
            id
            title = "Nounours"
            content = "J'aime les pâtes"
            garden_id
            created_at
            updated_at
            likes = "25"
          />
        </div>
      </section>
    </div>
    </>
  )
}

export default Profile;