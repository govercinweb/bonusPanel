"use strict";

var _AppRouter = require("./AppRouter");

var _user = _interopRequireDefault(require("../models/user"));

var _requestError = require("../error/request-error");

var _auth = require("../utils/auth");

var _session = _interopRequireDefault(require("../models/session"));

var _protectedRoute = require("../middlewares/auth/protected-route");

var _constants = require("../constants/constants");

var _accountBlockedError = require("../error/account-blocked-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authRouteHandler = _AppRouter.AppRouter.getInstance('/auth');

authRouteHandler.get('/currentuser', _protectedRoute.protectedRoute, (req, res) => {
  const {
    password: _,
    ...currentUser
  } = req.loggedInUser;
  res.json(currentUser);
});
authRouteHandler.post('/login', async (req, res) => {
  const {
    username,
    password
  } = req.body;
  const existingUser = await _user.default.findByEmailOrName(username);

  if (!existingUser || existingUser.password !== password) {
    throw new _requestError.RequestError(400, 'Invalid credentials');
  }

  if (existingUser.user_status_id !== _constants.UserStatus.ACTIVE) throw new _accountBlockedError.AccountBlockedError();
  const {
    id
  } = existingUser;
  const jwt_token = (0, _auth.signUser)({
    id,
    seed: Math.round(Math.random() * 10000)
  });
  await _session.default.addSession(jwt_token, id);
  res.json({
    jwt_token
  });
});
authRouteHandler.get('/logout', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    authorization: jwt_token
  } = req.headers;
  await _session.default.removeSession(jwt_token);
  res.json({});
});