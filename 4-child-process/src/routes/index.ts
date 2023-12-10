import express from 'express';
import { heathCheckHandler } from './health';
import { v1Routes } from './v1';

const rootRouter = express.Router();

rootRouter.get('/health', heathCheckHandler);
rootRouter.use('/v/1', v1Routes);

export {
  rootRouter,
};
