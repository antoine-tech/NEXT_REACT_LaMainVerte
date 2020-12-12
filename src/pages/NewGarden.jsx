import React, { useCallback } from 'react';
import GardenForm from '../components/Forms/GardenForm';
import SignContainer from '../components/SignContainer/index';
//import MyDropzone from '../components/DropZone/index';


const NewGarden = () => {

  return (
    <div>
      <SignContainer
        backgroundGradient='bg-blue-gradient'
        component={GardenForm}
        dropzone = {true}
      />
    </div>
  )
}

export default NewGarden;
