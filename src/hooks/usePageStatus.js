import { useState } from "react";

const usePageStatus = () => {
  const [pageStatus, setPageStatus] = useState("loading");

  return {
    pageStatus: pageStatus,
    setPageStatus,
  };
};

export default usePageStatus;
