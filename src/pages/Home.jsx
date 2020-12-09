import React from 'react';
// import { FormattedMessage } from 'react-intl';
import useCurrentUser from '../hooks/useCurrentUser';

const Home = () => {

  // current user custom hook to get in relation with redux global state
  const {current_user} = useCurrentUser()

  // render
  return (
  <h1>{JSON.stringify(current_user)}</h1>
  )
}

export default Home;