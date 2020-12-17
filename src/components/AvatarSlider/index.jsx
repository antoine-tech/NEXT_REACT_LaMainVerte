import React from "react";
import Slider from "infinite-react-carousel";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/index";
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
          <Link to={`/user/${user.id}`} key={`avatar-${user.id}`}>
            <div>
              <Avatar imageSrc={user?.avatar_url} />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default AvatarSlider;
