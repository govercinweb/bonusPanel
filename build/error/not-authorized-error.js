"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotAuthorizedError = void 0;

var _requestError = require("./request-error");

class NotAuthorizedError extends _requestError.RequestError {
  constructor(originalError) {
    super(401, 'Not authorized', originalError);
  }

}

exports.NotAuthorizedError = NotAuthorizedError;