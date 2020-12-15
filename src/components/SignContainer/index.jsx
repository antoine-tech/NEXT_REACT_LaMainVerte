import React, { useState } from "react";
import AbstractShape from "../AbstractShape/index";
import Alert from "../Alert";


const SignContainer = ({
  backgroundGradient,
  component: Component
}) => {
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  return (
    <section className="grid grid-cols-10">
      <div
        className={`hidden md:block md:col-span-5 lg:col-span-6 h-full ${backgroundGradient}`}
      >
        <AbstractShape />
      </div>

      <div className="grid grid-cols-1 col-span-10 md:col-span-5 lg:col-span-4 px-4 place-content-center min-h-screen overflow-y-auto relative">
        <Component
          setAlertMessage={setAlertMessage}
          setIsAlertDisplayed={setIsAlertDisplayed}
          setAlertType={setAlertType}
        />
        {isAlertDisplayed && (
          <Alert
            message={alertMessage}
            type={alertType}
            setIsAlertDisplayed={setIsAlertDisplayed}
          />
        )}
      </div>
    </section>
  );
};

export default SignContainer;
