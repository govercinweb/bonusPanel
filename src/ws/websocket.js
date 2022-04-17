import WebSocket, { WebSocketServer } from 'ws';
import { verifyUser } from '../utils/auth';

/**
 * @enum {SocketEvent}
 */
export const SocketEvent = {
  MESSAGE: 'message',
  CLOSE: 'close',
  CONNECT: 'connection',
};

const events = {};

/**
 * Emit websocket events to listeners
 * @param {SocketEvent} event
 * @param {string=} payload
 */
function emitEvent(event, payload) {
  const handlers = events[event];
  if (handlers) {
    handlers.forEach((callback) => {
      callback(payload);
    });
  }
}

const wss = new WebSocketServer({ port: 3030 });

wss.on(SocketEvent.CONNECT, (ws, req) => {
  try {
    const token = req.url.substring(1);
    verifyUser(token, process.env.JWT_SECRET);
  } catch (error) {
    ws.close();
  }
  emitEvent(SocketEvent.CONNECT);

  ws.on(SocketEvent.MESSAGE, (message) => {
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
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export const useWebSocket = () => {
  return { on, emitMessage };
};
