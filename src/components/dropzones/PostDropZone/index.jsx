import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ id, droppedImage, setDroppedImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (files) => {
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      });

      return setDroppedImage({ id, file: files[0] });
    },
  });

  return (
    <div className="gardenDropzone h-full">
      <div
        className="realDropzone h-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${droppedImage ? droppedImage.preview : ""})`,
        }}
        {...getRootProps()}
      >
        <input id={id} type="file" {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center text-white">Glissez ici l'image de votre jardin ...</p>
        ) : (
          <p className="text-center text-white">
            Glissez ici l'image de votre jardin <br />
            ou bien cliquez afin de sélectionner un fichier
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
