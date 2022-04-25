"use strict";

require("dotenv/config");

require("express-async-errors");

var _pg = _interopRequireDefault(require("pg"));

require("./routes");

require("./ws");

var _App = require("./App");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pg.default.defaults.parseInt8 = true;

const {
  port
} = _App.app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server is running on port: ${port}`);
}).address();