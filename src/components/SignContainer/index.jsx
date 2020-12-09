import React from "react";
import AbstractForm from '../AbstractForm/index';

const SignContainer = ({ backgroundGradient, component:Component }) => {
  return (
    <section className="grid grid-cols-10 min-h-screen">
      <div className={`hidden md:block col-span-6 min-h-full ${backgroundGradient}`}>
        <AbstractForm />
      </div>

      <div className="col-span-10 md:col-span-4 p-4  min-h-full">

            <Component/>

      </div>
    </section>
  );
};

export default SignContainer;
