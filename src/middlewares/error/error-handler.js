import { RequestError } from '../../error/request-error';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof RequestError) {
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: 'Internal server error',
      },
    });
    throw err;
  }
};
