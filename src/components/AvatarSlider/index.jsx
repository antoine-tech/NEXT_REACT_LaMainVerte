import React from "react";
import Slider from "infinite-react-carousel";
import Avatar from '../Avatar/index';
import "./index.scss";

const AvatarSlider = ({ sliderData }) => {
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
        {sliderData?.map((user) => (
          <div>

            <Avatar imageSrc={user?.avatar_url} />
          
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AvatarSlider;
