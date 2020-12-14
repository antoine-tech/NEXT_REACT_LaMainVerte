import React from "react";
import GardenForm from "../components/Forms/GardenForm";
import MyDropzone from "../components/DropZone/index";
import Alert from "../components/Alert/index";

const NewGarden = () => {
  const [droppedImage, setDroppedImage] = useState();



  return (
    <section className="grid grid-cols-10">
      <div className="hidden md:flex md:col-span-5 lg:col-span-6 items-center justify-center h-full bg-abstractform">
        <MyDropzone
          droppedImage={droppedImage}
          setDroppedImage={(value) => setDroppedImage(value)}
        />
      </div>

      <div className="col-span-10 md:col-span-5 lg:col-span-4 min-h-screen overflow-y-auto relative px-4">
        <GardenForm
          droppedImage={droppedImage}
        />
      </div>
    </section>
  );
};

export default NewGarden;
