import React from "react";
import "@lottiefiles/lottie-player";

const LoadingAnimation = () => {
  return (
    <lottie-player
      autoplay
      loop
      mode="normal"
      src="https://assets2.lottiefiles.com/packages/lf20_rK1iJW.json"
      style={{ width: "100vh", height:"100vh", position:'fixed', top:'0' }}
    ></lottie-player>
  );
};

export default LoadingAnimation;
