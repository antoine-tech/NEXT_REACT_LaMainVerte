const setCurrentUser = (user) => {
  return {
    type: "CURRENT_USER",
    payload: {
      current_user: user,
    },
  };
};

const setNotifications = (notifications) => {
  return {
    type: "NOTIFICATION",
    payload: notifications,
  };
};

export { setCurrentUser, setNotifications };
