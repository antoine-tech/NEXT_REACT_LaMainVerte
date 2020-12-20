import React from "react";
import CloseMenuIcon from "../base_components/icons/CloseMenuIcon";
import Notification from "../Notification/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../redux/actions";
import empty_result from "../../assets/backgrounds/empty_result.svg";

const MenuNotification = ({ current_user, handleMenuToogle }) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setNotifications([]));
    handleMenuToogle();
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-4/6 lg:w-2/6 h-screen z-40 p-8 block bg-white shadow-neomorph-1 overflow-auto">
      <CloseMenuIcon
        onClick={handleClick}
        classNames={["absolute", "top-8", "right-8"]}
      />

      {notifications.length > 0 ? (
        <>
          <h4 className="my-4 italic w-full text-center">C'est nouveau sur LaMainVerte ...</h4>
          {notifications.map((notification) => {
            let { content, type, label, pathName } = notification;
            return (
              <Notification
                key={`notification-${type}-${content.id}`}
                type={type}
                content={content}
                label={label}
                pathName={pathName}
              />
            );
          })}
        </>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">

          <img src={empty_result} className="h-96 w-96 mx-auto" alt="no result found" />

          <h4 className="my-4 w-full text-center">Rien pour le moment ...</h4>

          
        </div>
      )}
    </div>
  );
};

export default MenuNotification;
