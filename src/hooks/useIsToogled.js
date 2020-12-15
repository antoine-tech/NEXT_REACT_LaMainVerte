import React, { useState } from 'react';

const useIsToogled = () => {
  const [isToogled, setIsToogled] = useState(true);

  const handleChange = (event) => {
    setIsToogled(!isToogled);
  }

  return {
    isToogled,
    handleChange: () => handleChange(),
  }
}

export default useIsToogled;
