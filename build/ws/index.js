"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _websocket = require("./websocket");

Object.keys(_websocket).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _websocket[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _websocket[key];
    }
  });
});