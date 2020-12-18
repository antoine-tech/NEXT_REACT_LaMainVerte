import React from "react";
import SignContainer from "../components/SignContainer/index";
import LoginForm from "../components/Forms/LoginForm/index";

const Login = () => {
  return (
      <SignContainer
        backgroundGradient="bg-green-gradient"
        component={LoginForm}
      />
  );
};

export default Login;
