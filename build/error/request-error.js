"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestError = void 0;

class RequestError extends Error {
  constructor(statusCode, message, originalError) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (originalError) console.error(originalError);
  }

}

exports.RequestError = RequestError;