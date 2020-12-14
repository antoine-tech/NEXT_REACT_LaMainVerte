import React from "react";
import GardenForm from "../components/Forms/GardenForm";
import MyDropzone from "../components/DropZone/index";
import Alert from "../components/Alert/index";

const NewGarden = () => {
  return (
    <section className="grid grid-cols-10">
      <div
        className={`hidden md:flex md:col-span-5 lg:col-span-6 items-center justify-center h-full bg-abstractform`}
      >
        <MyDropzone />
      </div>

      <div className="grid grid-cols-1 col-span-10 md:col-span-5 lg:col-span-4 px-4 place-content-center min-h-screen overflow-y-auto relative">
        <GardenForm />
       
      </div>
    </section>
  );
};

export default NewGarden;
