import DB from '../utils/db';
import { MessageStatus } from '../constants/constants';

const selectMessageSql = `select *, message_status as status_id, 
       (select status_name as status from message_status where message_status.status_id = messages.message_status) from messages`;

const getList = async () => {
  const { rows } = await DB.executeQuery(`${selectMessageSql}`);

  return rows;
};

const getMessageById = async (id) => {
  const {
    rows: [result],
  } = await DB.executeQuery(`${selectMessageSql} where id = $1`, [id]);

  return result;
};

const getActiveList = async () => {
  const { rows } = await DB.executeQuery(
    `
    select id, message from messages 
    where message_status = $1
  `,
    [MessageStatus.ACTIVE]
  );

  return rows;
};

const addMessage = async (text, status) => {
  await DB.executeQuery(
    'insert into messages (message,message_status) VALUES ($1,$2)',
    [text, status]
  );
};

const updateMessage = async (id, text, status) => {
  await DB.executeQuery(
    'update messages set message = $1, message_status = $2 where id = $3',
    [text, status, id]
  );
};

const removeMessage = async (id) => {
  await DB.executeQuery('delete from messages where id = $1', [id]);
};

const Message = {
  getActiveList,
  getList,
  addMessage,
  updateMessage,
  removeMessage,
  getMessageById,
};

export default Message;
