"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _errorHandler = require("./middlewares/error/error-handler");

var _AppRouter = require("./routes/AppRouter");

var _protectedRoute = require("./middlewares/auth/protected-route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;

const {
  router
} = _AppRouter.AppRouter.getInstance();

app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((0, _morgan.default)('tiny'));
app.use(router);
app.get('/*', _protectedRoute.protectedRoute, (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Invalid route'
    }
  });
});
app.post('/*', _protectedRoute.protectedRoute, (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Invalid route'
    }
  });
});
app.use(_errorHandler.errorHandler);