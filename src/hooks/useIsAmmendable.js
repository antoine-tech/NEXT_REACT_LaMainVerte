import { useState } from "react";
const useIsAmmendable = () => {
  const [isAmmendable, setIsAmmendable] = useState(false);

  return {
    isAmmendable,
    setIsAmmendable: () => setIsAmmendable(!isAmmendable),
  };
};

export default useIsAmmendable;
