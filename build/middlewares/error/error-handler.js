"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var _requestError = require("../../error/request-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof _requestError.RequestError) {
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        message: err.message
      }
    });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: 'Internal server error'
      }
    });
    throw err;
  }
};

exports.errorHandler = errorHandler;