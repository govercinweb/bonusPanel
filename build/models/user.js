"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const selectUserSQL = `select *, user_type as user_type_id, user_status as user_status_id, 
       (select type_name as user_type from user_type where type_id = users.user_type), 
       (select status_name as user_status from user_status where status_id = users.user_status) 
from users`;

const getUserList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`${selectUserSQL}`);
  return rows;
};

const createUser = async (loginName, password, username, email, phone, userType, userStatus, permissions) => {
  const client = _db.default.getClient();

  await client.connect();
  const {
    rows: [{
      id: userId
    }]
  } = await client.executeQuery('insert into users (login_name,password,user_name,email,phone,user_type,user_status,create_date,update_date) VALUES($1,$2,$3,$4,$5,$6,$7,current_timestamp,current_timestamp) returning id', [loginName, password, username, email, phone, userType, userStatus]);
  await client.executeQuery('delete from user_bonus_permissions where user_id = $1', [userId]);

  for (let i = 0; i < permissions.length; i++) {
    const bonusId = permissions[i];
    await client.executeQuery('insert into user_bonus_permissions (user_id, bonus_id) VALUES($1,$2)', [userId, bonusId]);
  }

  await client.end();
};

const updateUser = async (id, loginName, password, username, email, phone, userType, userStatus, permissions) => {
  const client = _db.default.getClient();

  await client.connect();
  await client.executeQuery('update users set login_name = $1, password = $2, user_name = $3, email = $4, phone = $5, user_type = $6, user_status = $7, update_date = current_timestamp where id = $8', [loginName, password, username, email, phone, userType, userStatus, id]);
  await client.executeQuery('delete from user_bonus_permissions where user_id = $1', [id]);

  for (let i = 0; i < permissions.length; i++) {
    const bonusId = permissions[i];
    await client.executeQuery('insert into user_bonus_permissions (user_id, bonus_id) VALUES($1,$2)', [id, bonusId]);
  }

  await client.end();
};

const updateUserProfile = async (id, loginName, password, username, userSurname, email, phone) => {
  await _db.default.executeQuery('update users set login_name = $1, password = $2, user_name = $3, user_surname = $4, email = $5, phone = $6, update_date = current_timestamp where id = $7', [loginName, password, username, userSurname, email, phone, id]);
};

const removeUser = async id => {
  const client = _db.default.getClient();

  await client.connect();
  await client.executeQuery('delete from sessions where user_id = $1', [id]);
  await client.executeQuery('delete from users where id = $1', [id]);
  await client.end();
};

const findByEmailOrName = async input => {
  const {
    rows: [result]
  } = await _db.default.executeQuery(`${selectUserSQL} where email = $1 or login_name = $2`, [input, input]);
  return result;
};

const findById = async id => {
  const {
    rows: [result]
  } = await _db.default.executeQuery(`${selectUserSQL} where id = $1`, [id]);
  return result;
};

const User = {
  findByEmailOrName,
  findById,
  getUserList,
  createUser,
  updateUser,
  updateUserProfile,
  removeUser
};
var _default = User;
exports.default = _default;