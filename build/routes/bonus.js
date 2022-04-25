"use strict";

var _AppRouter = require("./AppRouter");

var _protectedRoute = require("../middlewares/auth/protected-route");

var _bonus = _interopRequireDefault(require("../models/bonus"));

var _validation = require("../utils/validation");

var _adminRoute = require("../middlewares/auth/admin-route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bonusHandler = _AppRouter.AppRouter.getInstance('/bonus');

bonusHandler.get('/list', _protectedRoute.protectedRoute, async (req, res) => {
  const bonusList = await _bonus.default.getList();
  res.json(bonusList);
});
bonusHandler.get('/list/active', async (req, res) => {
  const activeBonusList = await _bonus.default.getActiveList();
  res.json(activeBonusList);
});
bonusHandler.post('/create', _adminRoute.adminRoute, async (req, res) => {
  const {
    text,
    content,
    statusId
  } = req.body;
  (0, _validation.validateFields)({
    text,
    statusId
  });
  await _bonus.default.addBonus(text, content, statusId);
  res.json({});
});
bonusHandler.post('/update/:id', _adminRoute.adminRoute, async (req, res) => {
  const {
    text,
    content,
    statusId
  } = req.body;
  const {
    id
  } = req.params;
  (0, _validation.validateFields)({
    text,
    statusId,
    id
  });
  await _bonus.default.updateBonus(id, text, content, statusId);
  res.json({});
});
bonusHandler.get('/:id', _protectedRoute.protectedRoute, async (req, res) => {
  const {
    id
  } = req.params;
  const bonus = (await _bonus.default.getBonusById(id)) || {};
  res.json(bonus);
});