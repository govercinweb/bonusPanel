import DB from '../utils/db';
import { NotAuthorizedError } from '../error/not-authorized-error';

async function addSession(jwt_token, user_id) {
  const client = DB.getClient();
  await client.connect();
  const {
    rows: [{ count }],
  } = await client.executeQuery(
    'select count(*) from sessions where user_id = $1;',
    [user_id]
  );
  if (count >= 4) {
    await client.executeQuery(
      'delete from sessions where user_id = $1 and create_date in (select create_date from sessions where user_id = $2 order by create_date asc limit $3)',
      [user_id, user_id, count - 4]
    );
  }
  await client.executeQuery(
    'insert into sessions (user_id,jwt_token,create_date) values($1,$2,current_timestamp)',
    [user_id, jwt_token]
  );
  await client.end();
}

async function removeSession(jwt_token) {
  await DB.executeQuery('delete from sessions where jwt_token = $1', [
    jwt_token,
  ]);
}

async function getSession(jwt_token) {
  const {
    rows: [result],
  } = await DB.executeQuery('select * from sessions where jwt_token = $1', [
    jwt_token,
  ]);

  if (result) return result;
  else throw new NotAuthorizedError();
}

const Session = { addSession, removeSession, getSession };

export default Session;
