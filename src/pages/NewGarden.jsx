import React from 'react';
import GardenForm from '../components/Forms/GardenForm';
import SignContainer from '../components/SignContainer/index';


const NewGarden = () => {
  return (
    <SignContainer
      backgroundGradient='bg-blue-gradient'
      component={GardenForm}
    />
  )
}

export default NewGarden;
