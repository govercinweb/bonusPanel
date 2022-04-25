"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.signUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _notAuthorizedError = require("../error/not-authorized-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyUser = encoded => {
  try {
    const {
      iat: _,
      ...user
    } = _jsonwebtoken.default.verify(encoded, process.env.JWT_SECRET);

    return user;
  } catch (error) {
    throw new _notAuthorizedError.NotAuthorizedError();
  }
};

exports.verifyUser = verifyUser;

const signUser = payload => {
  try {
    return _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET);
  } catch (error) {
    throw new _notAuthorizedError.NotAuthorizedError();
  }
};

exports.signUser = signUser;