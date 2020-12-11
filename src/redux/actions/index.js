const setCurrentUser = (user) => {
  return {
    type: "CURRENT_USER",
    payload: {
      current_user: user,
    },
  };
};

export { setCurrentUser };
