import DB from '../utils/db';
import { RequestError } from '../error/request-error';

const getSettings = async (key) => {
  const {
    rows: [row],
  } = await DB.executeQuery('select value from settings where key = $1', [key]);
  if (row) {
    return row.value;
  } else {
    throw new RequestError(404, 'Key not found');
  }
};

const setSettings = async (key, value) => {
  const client = DB.getClient();
  await client.connect();
  const { rows } = await client.executeQuery(
    'select value from settings where key = $1',
    [key]
  );
  if (rows.length > 0) {
    await client.executeQuery('update settings set value = $1 where key = $2', [
      value,
      key,
    ]);
  } else {
    await client.executeQuery(
      'insert into settings (key,value) values($1,$2)',
      [key, value]
    );
  }
  await client.end();
};

export const Settings = { getSettings, setSettings };
