import React, { useState } from "react";
import GardenForm from "../components/Forms/GardenForm";
import MyDropzone from "../components/DropZone/index";

const NewGarden = () => {
  const [droppedImage, setDroppedImage] = useState();

  return (
    <section className="grid grid-cols-10">
      <div className="hidden md:flex md:col-span-5 lg:col-span-6 items-center justify-center h-full bg-abstractform relative">
        <MyDropzone
          droppedImage={droppedImage}
          setDroppedImage={(value) => setDroppedImage(value)}
        />
      </div>

      <div className="flex flex-col justify-center col-span-10 md:col-span-5 lg:col-span-4 min-h-80vh overflow-y-auto relative px-4">
        <GardenForm
          droppedImage={droppedImage}
        />
      </div>
    </section>
  );
};

export default NewGarden;
