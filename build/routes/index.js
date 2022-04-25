"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require("./auth");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});

var _user = require("./user");

Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});

var _blacklist = require("./blacklist");

Object.keys(_blacklist).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _blacklist[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _blacklist[key];
    }
  });
});

var _message = require("./message");

Object.keys(_message).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _message[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _message[key];
    }
  });
});

var _bonus_request = require("./bonus_request");

Object.keys(_bonus_request).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bonus_request[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bonus_request[key];
    }
  });
});

var _bonus = require("./bonus");

Object.keys(_bonus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bonus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bonus[key];
    }
  });
});