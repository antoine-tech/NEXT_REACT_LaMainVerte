import React from "react";
import Slider from "infinite-react-carousel";

const AvatarSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    duration: 500,
    centerMode: true,
    initialSlide: 1,
    slidesPerRow: 3,
    wheel: true,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
        <div>
          <div className="suggestion-avatar">
            <div className="avatar-img"></div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default AvatarSlider;
