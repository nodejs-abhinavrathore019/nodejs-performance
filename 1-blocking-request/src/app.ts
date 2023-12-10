import express = require('express');
import { logger } from './utils/logger';
import appConfiguration = require('./configs/app');
import { connectMongo } from './database/mongodb';
import { rootRouter } from './routes';
import { ExpressErrorHandler } from './middlewares/error-handler/express-error-handler';

const { appConfig } = appConfiguration;

const app = express();

app.use(express.json());

app.use('/api', rootRouter);

// setting middleware for error handling.
// In case if the error is not handled in some routes, it will get captured here.
// eslint-disable-next-line no-unused-vars
app.use(ExpressErrorHandler);

const server = app.listen(appConfig.port, async () => {
  try {
    await connectMongo();
    logger.info(`Listening at http://localhost:${appConfig.port}`);
  } catch (error) {
    logger.error('Cannot start application, error: ', error);
    throw error;
  }
});

export { app, server };
