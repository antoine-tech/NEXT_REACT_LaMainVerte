import MaskImage from "../../assets/backgrounds/mask_image.png";

const GardenCoverImage = ({ gardenData }) => {
  return (
    <div
      className="absolute z-10 w-full"
      style={{
        backgroundImage: `url(${gardenData?.garden?.picture_url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <img
        src={MaskImage}
        alt=""
        className="h-full w-full"
        style={{
          backgroundColor: `rgba(255,255,255,${gardenData?.garden?.picture_opacity})`,
        }}
      />
    </div>
  );
};

export default GardenCoverImage;
