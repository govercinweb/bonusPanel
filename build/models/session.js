"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

var _notAuthorizedError = require("../error/not-authorized-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addSession(jwt_token, user_id) {
  const client = _db.default.getClient();

  await client.connect();
  await client.executeQuery('delete from sessions where user_id = $1', [user_id]);
  await client.executeQuery('insert into sessions (user_id,jwt_token,create_date) values($1,$2,current_timestamp)', [user_id, jwt_token]);
  await client.end();
}

async function removeSession(jwt_token) {
  await _db.default.executeQuery('delete from sessions where jwt_token = $1', [jwt_token]);
}

async function getSession(jwt_token) {
  const {
    rows: [result]
  } = await _db.default.executeQuery('select * from sessions where jwt_token = $1', [jwt_token]);
  if (result) return result;else throw new _notAuthorizedError.NotAuthorizedError();
}

const Session = {
  addSession,
  removeSession,
  getSession
};
var _default = Session;
exports.default = _default;