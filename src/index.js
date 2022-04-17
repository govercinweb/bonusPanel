import 'dotenv/config';
import 'express-async-errors';
import pg from 'pg';
import './routes';
import './ws';
import { app } from './App';

pg.defaults.parseInt8 = true;

const { port } = app
  .listen(process.env.PORT || 3000, () => {
    console.log(`Express server is running on port: ${port}`);
  })
  .address();
