import React from "react";

const LetsGoButton = ({backgroundColor, text}) => {
  return (
    <button
      className={`${backgroundColor} btn-lg col-span-2 bg-transparent border border-solid font-bold uppercase`}
      type="submit"
    >
      {text}
    </button>
  );
};

export default LetsGoButton;
