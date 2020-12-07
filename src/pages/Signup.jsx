import React from 'react';
import RegisterForm from '../components/Forms/RegisterForm';
// import { FormattedMessage } from 'react-intl';

const Signup = () => {
  return (
    <div className="register-page">
      <h1>Sign up</h1>
      <RegisterForm />
    </div>
  )
}

export default Signup;