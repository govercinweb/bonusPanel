"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWebSocket = exports.SocketEvent = void 0;

var _ws = _interopRequireWildcard(require("ws"));

var _auth = require("../utils/auth");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @enum {SocketEvent}
 */
const SocketEvent = {
  MESSAGE: 'message',
  CLOSE: 'close',
  CONNECT: 'connection'
};
exports.SocketEvent = SocketEvent;
const events = {};
/**
 * Emit websocket events to listeners
 * @param {SocketEvent} event
 * @param {string=} payload
 */

function emitEvent(event, payload) {
  const handlers = events[event];

  if (handlers) {
    handlers.forEach(callback => {
      callback(payload);
    });
  }
}

const wss = new _ws.WebSocketServer({
  port: 3030
});
wss.on(SocketEvent.CONNECT, (ws, req) => {
  try {
    const token = req.url.substring(1);
    (0, _auth.verifyUser)(token, process.env.JWT_SECRET);
  } catch (error) {
    ws.close();
  }

  emitEvent(SocketEvent.CONNECT);
  ws.on(SocketEvent.MESSAGE, message => {
    emitEvent(SocketEvent.MESSAGE, message);
  });
  ws.on(SocketEvent.CLOSE, () => {
    console.log('closed');
  });
});
/**
 * Listen to websocket events
 * @param {SocketEvent} event
 * @param {Function} callback
 */

function on(event, callback) {
  const handlers = events[event] || [];
  handlers.push(callback);
  events[event] = handlers;
}

function emitMessage(message) {
  try {
    message = JSON.stringify(message);
  } catch (error) {}

  wss.clients.forEach(function each(client) {
    if (client.readyState === _ws.default.OPEN) {
      client.send(message);
    }
  });
}

const useWebSocket = () => {
  return {
    on,
    emitMessage
  };
};

exports.useWebSocket = useWebSocket;