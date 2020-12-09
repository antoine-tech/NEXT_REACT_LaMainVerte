import React from "react";
import AbstractForm from '../AbstractForm/index';

const SignContainer = ({ backgroundGradient }) => {
  return (
    <section className="grid grid-cols-10 gap-4 min-h-screen">
      <div className={`col-span-6 min-h-full ${backgroundGradient}`}>
        <AbstractForm />
      </div>

      <div className="col-span-4 min-h-full"></div>
    </section>
  );
};

export default SignContainer;
