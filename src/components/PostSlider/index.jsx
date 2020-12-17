import React from "react";
import Slider from "infinite-react-carousel";

const PostSlider = ({ sliderData, classNames }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    duration: 500,
    centerMode: false,
    initialSlide: 1,
    slidesPerRow: 1,
    wheel: true,
  };

  return (
    <div className={classNames ? classNames.join(' ') : ''}>
      <Slider {...settings}>
        {sliderData?.map((image) => (
          <div key={image}>
            <img src={image} alt="post" className="h-full w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PostSlider;
