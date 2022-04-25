"use strict";

var _adminRoute = require("../middlewares/auth/admin-route");

var _user = _interopRequireDefault(require("../models/user"));

var _AppRouter = require("./AppRouter");

var _validation = require("../utils/validation");

var _protectedRoute = require("../middlewares/auth/protected-route");

var _bonus = _interopRequireDefault(require("../models/bonus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouteHandler = _AppRouter.AppRouter.getInstance('/users');

userRouteHandler.get('/list', _adminRoute.adminRoute, async (req, res) => {
  const userList = await _user.default.getUserList();
  res.json(userList);
});
userRouteHandler.post('/create', _adminRoute.adminRoute, async (req, res) => {
  const {
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions
  } = req.body;
  (0, _validation.validateFields)({
    loginName,
    password,
    username,
    userType,
    userStatus,
    permissions
  });
  await _user.default.createUser(loginName, password, username, email, phone, userType, userStatus, permissions);
  res.json({});
});
userRouteHandler.post('/update', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    loginName,
    password,
    username,
    userSurname,
    email,
    phone
  } = req.body;
  (0, _validation.validateFields)({
    loginName,
    password,
    username,
    userSurname
  });
  const {
    id
  } = req.loggedInUser;
  await _user.default.updateUserProfile(id, loginName, password, username, userSurname, email, phone);
  res.json({});
});
userRouteHandler.post('/update/:id', _adminRoute.adminRoute, async (req, res) => {
  const {
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions
  } = req.body;
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id,
    loginName,
    password,
    username,
    userType,
    userStatus,
    permissions
  });
  await _user.default.updateUser(id, loginName, password, username, email, phone, userType, userStatus, permissions);
  res.json({});
});
userRouteHandler.post('/remove/:id', _adminRoute.adminRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  await _user.default.removeUser(id);
  res.json({});
});
userRouteHandler.get('/:id', _adminRoute.adminRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  const user = (await _user.default.findById(id)) || {};
  const bonus_permissions = await _bonus.default.getBonusPermissionsByUserId(id);
  const bonus_list = await _bonus.default.getList();
  res.json({ ...user,
    bonus_permissions,
    bonus_list
  });
});