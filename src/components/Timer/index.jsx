import React, { useState, useEffect } from "react";
import WEBSOCKET_CLIENT from "../../services/WebsocketClient";

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [lastMessageTime, setLastMesageTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 5000);

    if (currentTime - lastMessageTime >= 50 * 1000) {
      WEBSOCKET_CLIENT.send(JSON.stringify({ ping: Date.now() }));
      setLastMesageTime(Date.now());
      return clearInterval(interval);
    }
  }, [currentTime]);

  return [currentTime, setCurrentTime];
};

export default Timer;
