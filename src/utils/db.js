import { Client } from 'pg';
import { InvalidOperationError } from '../error/invalid-operation-error';

const credentials = {
  user: process.env.POSTGRES_USER,
  // host: 'localhost',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  // ssl: true
  ssl: { rejectUnauthorized: false }
};

(async function () {
  console.log('Testing db connection...');
  const client = new Client(credentials);
  try {
    await client.connect();
    console.log('DB is up and running.');
  } catch (error) {
    await client.end();
    console.warn('Cannot connect to the db... Check the logs...');
    console.error(error);
    console.warn('Terminating...');
    process.exit(1);
  }
  await client.end();
})();

async function executeQuery(query, values) {
  const client = new Client(credentials);
  let result;
  await client.connect();
  await client.query('BEGIN');
  try {
    result = await client.query(query, values);
  } catch (error) {
    await client.query('ROLLBACK');
    await client.end();
    throw new InvalidOperationError(error);
  }
  await client.query('COMMIT');
  await client.end();
  return {
    count: result.rowCount,
    rows: result.rows,
  };
}

function getClient() {
  const client = new Client(credentials);
  return {
    executeQuery: async function (query, values) {
      try {
        const result = await client.query(query, values);
        return {
          count: result.rowCount,
          rows: result.rows,
        };
      } catch (error) {
        await client.query('ROLLBACK');
        await client.end();
        throw new InvalidOperationError(error);
      }
    },
    connect: async function () {
      await client.connect();
      await client.query('BEGIN');
    },
    end: async function () {
      await client.query('COMMIT');
      await client.end();
    },
    rollback: async function () {
      await client.query('ROLLBACK');
      await client.end();
    },
  };
}

const DB = { executeQuery, getClient };

export default DB;
