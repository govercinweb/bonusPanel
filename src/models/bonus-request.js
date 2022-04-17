import DB from '../utils/db';
import { RequestError } from '../error/request-error';
import { NotAuthorizedError } from '../error/not-authorized-error';
import { BlockedUserStatus, BonusRequestStatus } from '../constants/constants';

const selectBonusRequestSql = `select *, request_status as status_id,
           (select bonus_text from bonuses where bonuses.id = bonus_requests.bonus_id),
           (select bonus_content from bonuses where bonuses.id = bonus_requests.bonus_id),
           (select message from messages where messages.id = bonus_requests.message_id),
           to_char(create_date,'dd-mm-yyyy hh24:mi') as create_date, to_char(process_date,'dd-mm-yyyy hh24:mi') as process_date,
           (select status_name as status from bonus_request_status where bonus_request_status.status_id = bonus_requests.request_status) from bonus_requests`;

const searchRequestListByUserName = async (username) => {
  const { rows } = await DB.executeQuery(
    `${selectBonusRequestSql} where user_name like $1 order by bonus_requests.create_date desc`,
    [`%${username}%`]
  );

  return rows;
};

const getWaitingRequestList = async () => {
  const { rows } = await DB.executeQuery(
    `${selectBonusRequestSql} where request_status = $1 order by bonus_requests.create_date desc`,
    [BonusRequestStatus.WAITING]
  );

  return rows;
};

const getApprovedRequestList = async () => {
  const { rows } = await DB.executeQuery(
    `${selectBonusRequestSql} where request_status = $1 order by bonus_requests.create_date desc`,
    [BonusRequestStatus.ACCEPTED]
  );

  return rows;
};

const getRejectedRequestList = async () => {
  const { rows } = await DB.executeQuery(
    `${selectBonusRequestSql} where request_status = $1 order by bonus_requests.create_date desc`,
    [BonusRequestStatus.REJECTED]
  );

  return rows;
};

const getRequestsByUserName = async (username) => {
  const { rows } = await DB.executeQuery(
    `${selectBonusRequestSql} where user_name = $1 order by bonus_requests.create_date desc limit 10`,
    [username]
  );

  return rows;
};

const addBonusRequest = async (userName, bonusId) => {
  const client = DB.getClient();
  await client.connect();
  const {
    rows: [{ count }],
  } = await client.executeQuery(
    'select count(*) from blocked_users where user_name = $1 and user_status = $2',
    [userName, BlockedUserStatus.DEACTIVE]
  );
  if (count > 0) {
    await client.rollback();
    throw new RequestError(401, 'This username is blocked');
  }
  await client.executeQuery(
    `
      insert into bonus_requests (user_name,bonus_id,create_date,process_date,request_status)
      values ($1,$2,current_timestamp,current_timestamp,$3);
    `,
    [userName, bonusId, BonusRequestStatus.WAITING]
  );
  await client.end();
};

const updateBonusRequest = async (
  loggedInUserId,
  requestId,
  bonusId,
  note,
  messageId,
  statusId
) => {
  const client = DB.getClient();
  await client.connect();

  const {
    rows: [{ count }],
  } = await client.executeQuery(
    'select count(*) from user_bonus_permissions where user_id = $1 and bonus_id = $2',
    [loggedInUserId, bonusId]
  );

  if (count === 0) {
    await client.rollback();
    throw new NotAuthorizedError();
  }

  await client.executeQuery(
    `
      update bonus_requests set bonus_id = $1, process_date = current_timestamp, note = $2, message_id = $3, request_status = $4
        where id = $5
    `,
    [bonusId, note, messageId, statusId, requestId]
  );

  await client.end();
};

const getBonusRequestById = async (id) => {
  const {
    rows: [result],
  } = await DB.executeQuery(`${selectBonusRequestSql} where id = $1`, [id]);

  return result;
};

const BonusRequest = {
  getRequestsByUserName,
  searchRequestListByUserName,
  getWaitingRequestList,
  getApprovedRequestList,
  getRejectedRequestList,
  addBonusRequest,
  updateBonusRequest,
  getBonusRequestById,
};

export default BonusRequest;
