"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

var _constants = require("../constants/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const selectMessageSql = `select *, message_status as status_id, 
       (select status_name as status from message_status where message_status.status_id = messages.message_status) from messages`;

const getList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`${selectMessageSql}`);
  return rows;
};

const getMessageById = async id => {
  const {
    rows: [result]
  } = await _db.default.executeQuery(`${selectMessageSql} where id = $1`, [id]);
  return result;
};

const getActiveList = async () => {
  const {
    rows
  } = await _db.default.executeQuery(`
    select id, message from messages 
    where message_status = $1
  `, [_constants.MessageStatus.ACTIVE]);
  return rows;
};

const addMessage = async (text, status) => {
  await _db.default.executeQuery('insert into messages (message,message_status) VALUES ($1,$2)', [text, status]);
};

const updateMessage = async (id, text, status) => {
  await _db.default.executeQuery('update messages set message = $1, message_status = $2 where id = $3', [text, status, id]);
};

const removeMessage = async id => {
  await _db.default.executeQuery('delete from messages where id = $1', [id]);
};

const Message = {
  getActiveList,
  getList,
  addMessage,
  updateMessage,
  removeMessage,
  getMessageById
};
var _default = Message;
exports.default = _default;