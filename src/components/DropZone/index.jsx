import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

const MyDropzone = () => {
  const [droppedImages, setDroppedImages] = useState([]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedImages => {
      setDroppedImages(acceptedImages.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }});

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p>Glissez ici l'image de votre jardin ...</p> :
            <p>
              Glissez ici l'image de votre jardin <br />
            ou bien cliquez afin de sélectionner un fichier
          </p>
        }
      </div>

        <div className="grid grid-cols-10 imagePreview">
          <div className="md:flex md:col-span-5 lg:col-span-6 h-full justify-center">
            {droppedImages.map(file => (
                <div key={file.name}>
                  <img src={file.preview}/>
                </div>
            ))}
          </div>
        </div>

    </div>
  );
}

export default MyDropzone;
