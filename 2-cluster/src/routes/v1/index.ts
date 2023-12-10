import express from 'express';
import { catRoutes } from './cats';

const router = express.Router();

router.use('/cats', catRoutes);

export {
  router as v1Routes,
};
