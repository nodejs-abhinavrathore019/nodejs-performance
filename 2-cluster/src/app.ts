import express = require('express');
import cluster from 'cluster';
// import os from 'os';
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

// eslint-disable-next-line import/no-mutable-exports
let server;
const startServer = () => {
  server = app.listen(appConfig.port, async () => {
    try {
      await connectMongo();
      logger.info(`Listening at http://localhost:${appConfig.port}`);
    } catch (error) {
      logger.error('Cannot start application, error: ', error);
      throw error;
    }
  });
  return server;
};

// all processes running same app.js file.
logger.debug('Running app.js');
if (cluster.isPrimary) {
  logger.debug('Primary process');
  // Maximise cluster performance
  // const NUM_WORKERS = os.cpus().length;
  // for (let i = 0; i < NUM_WORKERS; i += 1) {
  //   cluster.fork();
  // }
  cluster.fork();
  cluster.fork();
} else {
  logger.debug('worker process');
  startServer();
}

export { app, server };
