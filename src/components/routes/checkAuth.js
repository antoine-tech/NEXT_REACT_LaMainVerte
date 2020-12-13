const checkAuth = (current_user) => {
  console.log(current_user);
  return current_user !== null;
};

export default checkAuth;
