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


  //   {droppedImages.map(file => (
  //     <div key={file.name}>
  //       <img src={file.preview}/>
  //     </div>
  // ))}

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p className="text-center">Glissez ici l'image de votre jardin ...</p> :
            <p  className="text-center">
              Glissez ici l'image de votre jardin <br />
            ou bien cliquez afin de sélectionner un fichier
          </p>
        }
      </div>

    </div>
  );
}

export default MyDropzone;
