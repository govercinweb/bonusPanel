import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error/error-handler';
import { AppRouter } from './routes/AppRouter';
import { protectedRoute } from './middlewares/auth/protected-route';

export const app = express();
const { router } = AppRouter.getInstance();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(router);

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
