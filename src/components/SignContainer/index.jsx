import React from "react";
import AbstractForm from "../AbstractForm/index";
import LaMainVerteBrand from "../LaMainVerteBrand /index";

const SignContainer = ({ backgroundGradient, component: Component }) => {
  return (
    <section className="grid grid-cols-10">
      <div
        className={`hidden md:block md:col-span-5 lg:col-span-6 h-full ${backgroundGradient}`}
      >
        <AbstractForm />
      </div>

      <div className="grid grid-cols-1 col-span-10 md:col-span-5 lg:col-span-4 px-4 place-content-center min-h-screen overflow-y-auto">

        <Component />
      </div>
    </section>
  );
};

export default SignContainer;
