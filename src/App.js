import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error/error-handler';
import { AppRouter } from './routes/AppRouter';
import { protectedRoute } from './middlewares/auth/protected-route';
import fileUpload from 'express-fileupload';
import path from 'path';

export const app = express();
const { router } = AppRouter.getInstance();

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(router);

app.use(
  '/home/bonus',
  express.static(path.join(process.env.PWD, 'public/bonus'))
);
app.use(
  '/home/static',
  express.static(path.join(process.env.PWD, 'public/static'))
);
app.use('/files', express.static(path.join(process.env.PWD, 'public/files')));

app.get('/*', protectedRoute, (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Invalid route',
    },
  });
});

app.post('/*', protectedRoute, (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Invalid route',
    },
  });
});

app.use(errorHandler);
