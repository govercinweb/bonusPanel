"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminRoute = void 0;

var _session = _interopRequireDefault(require("../../models/session"));

var _user = _interopRequireDefault(require("../../models/user"));

var _constants = require("../../constants/constants");

var _notAuthorizedError = require("../../error/not-authorized-error");

var _accountBlockedError = require("../../error/account-blocked-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const adminRoute = async (req, res, next) => {
  const {
    authorization: jwt_token
  } = req.headers;
  const session = await _session.default.getSession(jwt_token);
  if (!session) throw new _notAuthorizedError.NotAuthorizedError();
  const existingUser = await _user.default.findById(session.user_id);
  if (existingUser.user_status_id !== _constants.UserStatus.ACTIVE) throw new _accountBlockedError.AccountBlockedError();
  if (existingUser.user_type_id !== _constants.UserType.ADMIN) throw new _notAuthorizedError.NotAuthorizedError();
  req.loggedInUser = existingUser;
  next();
};

exports.adminRoute = adminRoute;