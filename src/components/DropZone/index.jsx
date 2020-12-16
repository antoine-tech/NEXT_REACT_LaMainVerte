import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ droppedImage, setDroppedImage }) => {
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

  return (
    <div className="gardenDropzone">
      <div className="realDropzone" {...getRootProps()}>
        <input type="file" id="image" {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center">Glissez ici l'image de votre jardin ...</p>
        ) : (
          <p className="text-center">
            Glissez ici l'image de votre jardin <br />
            ou bien cliquez afin de sélectionner un fichier
          </p>
        )}
      </div>
      <div className="imagePreview">
        {droppedImage?.map((file) => (
          <div key={file.name}>
            <img src={file.preview} alt="preview" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDropzone;
