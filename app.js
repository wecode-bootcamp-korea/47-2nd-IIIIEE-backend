import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './api/routes/index.js';

export const createApp = () => {
  const app = express();
  
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(router);

  app.all('*', (req, res, next) => {
    const err = new Error(`Can't fine ${req.originalUrl} on this server!`);

    err.statusCode = 404;

    next(err);
  });

//   app.use(globalErrorHandler);

  return app;
};

