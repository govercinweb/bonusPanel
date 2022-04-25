"use strict";

var _AppRouter = require("./AppRouter");

var _protectedRoute = require("../middlewares/auth/protected-route");

var _message = _interopRequireDefault(require("../models/message"));

var _validation = require("../utils/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageHandler = _AppRouter.AppRouter.getInstance('/message');

messageHandler.get('/list', _protectedRoute.protectedRoute, async (req, res) => {
  const list = await _message.default.getList();
  res.json(list);
});
messageHandler.get('/list/active', async (req, res) => {
  const list = await _message.default.getActiveList();
  res.json(list);
});
messageHandler.post('/create', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    message,
    statusId
  } = req.body;
  (0, _validation.validateFields)({
    message,
    statusId
  });
  await _message.default.addMessage(message, statusId);
  res.json({});
});
messageHandler.post('/update/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    message,
    statusId
  } = req.body;
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id,
    message,
    statusId
  });
  await _message.default.updateMessage(id, message, statusId);
  res.json({});
});
messageHandler.post('/remove/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  await _message.default.removeMessage(id);
  res.json({});
});
messageHandler.get('/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  const message = (await _message.default.getMessageById(id)) || {};
  res.json(message);
});