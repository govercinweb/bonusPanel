"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const selectBlockedUserSql = `select *, user_status as user_status_id, to_char(create_date,'dd-mm-yyyy hh24:mi') as create_date, to_char(update_date,'dd-mm-yyyy hh24:mi') as update_date,
           (select status_name as user_status from blocked_user_status where blocked_user_status.status_id = blocked_users.user_status) from blocked_users`;

const getList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`${selectBlockedUserSql}`);
  return rows;
};

const addUser = async (username, status) => {
  await _db.default.executeQuery('insert into blocked_users (user_name,create_date,update_date,user_status) values($1,current_timestamp,current_timestamp,$2)', [username, status]);
};

const updateUser = async (id, username, status) => {
  await _db.default.executeQuery('update blocked_users set user_status = $1, user_name = $2, update_date = current_timestamp where id = $3', [status, username, id]);
};

const removeUser = async id => {
  await _db.default.executeQuery('delete from blocked_users where id = $1', [id]);
};

const getUserById = async id => {
  const {
    rows: [result]
  } = await _db.default.executeQuery(`${selectBlockedUserSql} where id = $1
  `, [id]);
  return result;
};

const Blacklist = {
  getList,
  addUser,
  updateUser,
  removeUser,
  getUserById
};
var _default = Blacklist;
exports.default = _default;