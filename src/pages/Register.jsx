import React from 'react';
import RegisterForm from '../components/Forms/RegisterForm';
import SignContainer from '../components/SignContainer/index';

const Register = () => {
  return (
    <SignContainer
      backgroundGradient="bg-red-gradient"
      component={RegisterForm}
    />
  );
}

export default Register;
