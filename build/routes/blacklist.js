"use strict";

var _AppRouter = require("./AppRouter");

var _protectedRoute = require("../middlewares/auth/protected-route");

var _blacklist = _interopRequireDefault(require("../models/blacklist"));

var _validation = require("../utils/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const blacklistHandler = _AppRouter.AppRouter.getInstance('/blacklist');

blacklistHandler.get('/list', _protectedRoute.protectedRoute, async (req, res) => {
  const blacklistedUsers = await _blacklist.default.getList();
  res.json(blacklistedUsers);
});
blacklistHandler.post('/create', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    username,
    statusId
  } = req.body;
  (0, _validation.validateFields)({
    username,
    statusId
  });
  await _blacklist.default.addUser(username, statusId);
  res.json({});
});
blacklistHandler.post('/update/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    username,
    statusId
  } = req.body;
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id,
    username,
    statusId
  });
  await _blacklist.default.updateUser(id, username, statusId);
  res.json({});
});
blacklistHandler.post('/remove/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  await _blacklist.default.removeUser(id);
  res.json({});
});
blacklistHandler.get('/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  const blacklistedUser = (await _blacklist.default.getUserById(id)) || {};
  res.json(blacklistedUser);
});