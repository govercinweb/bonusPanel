"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountBlockedError = void 0;

var _requestError = require("./request-error");

class AccountBlockedError extends _requestError.RequestError {
  constructor(originalError) {
    super(401, 'This account is blocked. Please contact your administrator.', originalError);
  }

}

exports.AccountBlockedError = AccountBlockedError;