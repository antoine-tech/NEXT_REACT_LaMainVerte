import React from "react";
import Slider from "infinite-react-carousel";

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
            <div className="suggestion-avatar">
              <div className="avatar-img" >
                <img
                  title={user?.username}
                  src={user?.avatar_url}
                  className="h-full w-full rounded-full"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AvatarSlider;
