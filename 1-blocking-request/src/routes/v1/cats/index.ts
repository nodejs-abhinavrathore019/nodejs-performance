import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  validateQueryParams,
  validateParams,
} from '../../../middlewares';
import {
  getCatByIdSchema,
  getCatsListSchema,
} from '../../../validation/cat';
import { getCatsHandler } from '../../../controllers/cat/get-cats';
import { getCatByIdHandler } from '../../../controllers/cat/get-cat-by-id';

const router = express.Router();

router.get(
  '/',
  validateQueryParams(getCatsListSchema),
  expressAsyncHandler(getCatsHandler),
);

router.get(
  '/:id',
  validateParams(getCatByIdSchema),
  expressAsyncHandler(getCatByIdHandler),
);

export {
  router as catRoutes,
};
