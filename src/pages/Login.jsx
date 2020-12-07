import React from 'react';
import LoginForm from '../components/Forms/LoginForm';
// import { FormattedMessage } from 'react-intl';


const Login = () => {
  return (
    <div className="login-page">
      <h1>Log in</h1>
      <LoginForm />
    </div>
  )
}

export default Login;