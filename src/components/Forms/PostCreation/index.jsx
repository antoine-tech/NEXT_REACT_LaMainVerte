import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadToAWS } from "../../../services/Api";
import { createPost } from "../../../requests/posts";
import useJwtToken from "../../../hooks/useJwtToken";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import Button from "../../base_components/Button/index";
import TextArea from "../../base_components/TextArea/index";
import IconAdd from "../../base_components/icons/IconAdd/index";
import IconRemove from "../../base_components/icons/IconRemove/index";
import NewGarden from '../../../pages/NewGarden';
import FormGroup from '../../base_components/FormGroup/index';
import Dropzone from '../../dropzones/PostDropZone/index';
import useCurrentUser from '../../../hooks/useCurrentUser';
import WEBSOCKET_CLIENT from '../../../services/WebsocketClient';

const PostCreation = ({ setGardenData, gardenData, setNewPostZoneDisplayed }) => {

  const {current_user} = useCurrentUser()
  const { getJwtToken } = useJwtToken();

  const { garden_id } = useParams();

  const [imageFields, setImageFields] = useState([
    { id: "image1", file: null },
  ]);

  const handleAddImageField = () =>
    setImageFields([
      ...imageFields,
      { id: `image${imageFields.length + 1}`, file: null },
    ]);

  const handleRemoveImageField = () => {
    const newImagesFields = imageFields.slice(0, imageFields.length - 1);
    setImageFields(newImagesFields);
  };

  const handleDropImage = (value) => {
    const newImagesFields = imageFields.filter(
      (imageField) => imageField.id !== value.id
    );
    setImageFields([...newImagesFields, value]);
  };

  const handleSubmit = async () => {
    let imagesUrls = []

    if(imageFields[0].file){
      const imagesUrlsPromises = await imageFields.map((field) =>
        uploadToAWS(getJwtToken, field.file, "la-main-verte")
      );

      imagesUrls = await Promise.all(imagesUrlsPromises).then(
        (result) => result
      );
    }

    const newPost = await createPost(
      getJwtToken,
      garden_id,
      datas.title,
      datas.content,
      imagesUrls
    );


    const content = {
      id: newPost.id,
      author: current_user,
      gardenId:garden_id,
      teaser: newPost.content,
      created_at: newPost.created_at,
    };
    
    WEBSOCKET_CLIENT.send(
      JSON.stringify({
        label: "post",
        pathName: `/garden/${garden_id}`,
        type: "post",
        content,
      })
    );

    const newGardenData = {...gardenData, posts: [...gardenData.posts, newPost]}
    setGardenData(newGardenData);
    setNewPostZoneDisplayed(false);
  };

  const { datas, alerts, handleInput, handleBlur } = useFormAnalysis(
    {
      title: "",
      content: "Vos abonnés attendent des nouvelles de votre jardin",
    },
    {
      isEmpty: "Ce champ est obligatoire",
    }
  );

  return (
    <>
      <h4 className="col-span-4">Publier une mise à jour </h4>

      <FormGroup
        colSpan="4"
        onInput={(value) => handleInput(value)}
        onBlur={(value) => handleBlur(value)}
        value={datas.title}
        name="title"
        id="title"
        type="text"
        labelText="Titre du post:"
        alertMessage={alerts.title}
      />
      <TextArea
        value={datas.content}
        rows="10"
        id="content"
        name="content"
        classNames={["w-full border-gray-500", "col-span-4"]}
        onInput={(value) => handleInput(value)}
        onBlur={(value) => handleBlur(value)}
      />

      <div className="col-span-4 h-auto grid grid-cols-2 gap-4 overflow-auto">
        {imageFields.map((imageField) => {
          return (
            <div className="col-span-2 lg:col-span-2 bg-blue-gradient border-blue-dark w-full p-4 h-60">
              <Dropzone
                id={imageField.id}
                droppedImage={imageField.file}
                setDroppedImage={(value) => handleDropImage(value)}
              />
            </div>
          );
        })}
      </div>

      <Button
        content={IconAdd}
        classNames={[
          "btn",
          "bg-blue-dark",
          "text-white",
          "p-2",
          "w-full",
          "col-span-4",
          "flex",
          "items-center",
          "justify-center",
        ]}
        onclick={handleAddImageField}
      />

      {imageFields.length > 0 && (
        <Button
          content={IconRemove}
          classNames={[
            "btn",
            "bg-blue-dark",
            "text-white",
            "p-2",
            "w-full",
            "col-span-4",
            "flex",
            "items-center",
            "justify-center",
          ]}
          onclick={handleRemoveImageField}
        />
      )}

      <Button
        text="PARTAGER"
        classNames={[
          "btn",
          "btn-lg",
          "bg-blue-dark",
          "text-white",
          "p-4",
          "w-full",
          "col-span-4",
        ]}
        onclick={handleSubmit}
      />
    </>
  );
};

export default PostCreation;
