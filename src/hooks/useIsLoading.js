import { useState } from "react";

const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  return {
    isLoading,
    setIsLoading: () => setIsLoading(),
  };
};

export default useIsLoading;
