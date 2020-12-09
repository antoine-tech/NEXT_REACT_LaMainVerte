import React from "react";

const LetsGoButton = ({backgroundColor, text}) => {
  return (
    <button
      class={`${backgroundColor} btn-lg col-span-2 bg-transparent border border-solid font-bold uppercase`}
      type="button"
    >
      {text}
    </button>
  );
};

export default LetsGoButton;
