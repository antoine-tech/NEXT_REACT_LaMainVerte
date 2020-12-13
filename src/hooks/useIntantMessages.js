import { useState, useEffect } from "react";
import WEBSOCKET_CLIENT from "../sevices/WebsocketClient";
const useInstantMessages = () => {
  const [instantMessages, setInstantMessages] = useState([]);

  useEffect(() => {
    WEBSOCKET_CLIENT.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    WEBSOCKET_CLIENT.onmessage = function (newMessage) {
      setInstantMessages([...instantMessages, JSON.parse(newMessage.data)]);
    };

    WEBSOCKET_CLIENT.onclose = function (closeEvent, WEBSOCKET_CLIENT) {
      WEBSOCKET_CLIENT = new WebSocket("ws://ws-la-main-verte.herokuapp.com/");
    };
  }, []);

  return {
    instantMessages: instantMessages,
    sendInstantMessage: (messageObject) =>
      WEBSOCKET_CLIENT.send(JSON.stringify(messageObject)),
  };
};

export default useInstantMessages;
