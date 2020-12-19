
const CONNECTION_TYPE = process.env.NODE_ENV === "production" ? 'wss' : 'ws'

var WEBSOCKET_CLIENT = new WebSocket(`${CONNECTION_TYPE}://la-main-verte-ws.herokuapp.com`);

export default WEBSOCKET_CLIENT;
