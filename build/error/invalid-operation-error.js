"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidOperationError = void 0;

var _requestError = require("./request-error");

class InvalidOperationError extends _requestError.RequestError {
  constructor(originalError) {
    super(400, 'Invalid operation', originalError);
  }

}

exports.InvalidOperationError = InvalidOperationError;