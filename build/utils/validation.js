"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFields = void 0;

var _requestError = require("../error/request-error");

const validateFields = fields => {
  const missingFields = Object.keys(fields).filter(key => !fields[key]);
  if (missingFields.length > 0) throw new _requestError.RequestError(400, {
    'Missing field(s)': missingFields
  });
};

exports.validateFields = validateFields;