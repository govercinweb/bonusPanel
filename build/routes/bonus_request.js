"use strict";

var _validation = require("../utils/validation");

var _bonusRequest = _interopRequireDefault(require("../models/bonus-request"));

var _protectedRoute = require("../middlewares/auth/protected-route");

var _AppRouter = require("./AppRouter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bonusRequestHandler = _AppRouter.AppRouter.getInstance('/bonus');

bonusRequestHandler.get('/requests/list', async (req, res) => {
  const {
    username
  } = req.query;
  (0, _validation.validateFields)({
    username
  });
  const bonusRequestList = await _bonusRequest.default.getRequestsByUserName(username);
  res.json(bonusRequestList);
});
bonusRequestHandler.get('/requests/search', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    username
  } = req.query;
  (0, _validation.validateFields)({
    username
  });
  const bonusRequestList = await _bonusRequest.default.searchRequestListByUserName(username);
  res.json(bonusRequestList);
});
bonusRequestHandler.get('/requests', _protectedRoute.protectedRoute, async (req, res) => {
  const bonusRequestList = await _bonusRequest.default.getWaitingRequestList();
  res.json(bonusRequestList);
});
bonusRequestHandler.get('/requests/approved', _protectedRoute.protectedRoute, async (req, res) => {
  const bonusRequestList = await _bonusRequest.default.getApprovedRequestList();
  res.json(bonusRequestList);
});
bonusRequestHandler.get('/requests/rejected', _protectedRoute.protectedRoute, async (req, res) => {
  const bonusRequestList = await _bonusRequest.default.getRejectedRequestList();
  res.json(bonusRequestList);
});
bonusRequestHandler.post('/request/update/:requestId', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    note,
    messageId,
    statusId,
    bonusId
  } = req.body;
  const {
    requestId
  } = req.params;
  (0, _validation.validateFields)({
    statusId,
    bonusId,
    requestId
  });
  const {
    id
  } = req.loggedInUser;
  await _bonusRequest.default.updateBonusRequest(id, requestId, bonusId, note, messageId, statusId);
  res.json({});
});
bonusRequestHandler.post('/request/:id', async (req, res) => {
  const {
    username
  } = req.body;
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    username,
    id
  });
  await _bonusRequest.default.addBonusRequest(username, id);
  res.json({});
});
bonusRequestHandler.get('/request/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    id
  });
  const bonusRequest = (await _bonusRequest.default.getBonusRequestById(id)) || {};
  res.json(bonusRequest);
});