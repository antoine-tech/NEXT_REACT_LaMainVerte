import React, { useState, useEffect } from "react";
import useFormAnalysis from "../../../hooks/useFormAnalysis";
import Button from "../../Button/index";
import TextArea from "../../TextArea/index";
import FormGroup from "../../FormGroup/index";
import Dropzone from "../../PostDropZone/index";
import IconAdd from "../../icons/IconAdd";
import IconRemove from "../../icons/IconRemove";

const PostCreation = () => {
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

  useEffect(() => {
    console.log(imageFields);
  }, [imageFields]);

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
            <div className="col-span-2 lg:col-span-2 bg-blue-gradient border-blue-dark w-full p-4">
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
        onclick={() => console.log("")}
      />
    </>
  );
};

export default PostCreation;
