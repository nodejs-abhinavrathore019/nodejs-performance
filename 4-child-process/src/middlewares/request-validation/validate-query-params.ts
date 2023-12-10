import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';

const validateQueryParams = (requestQuerySchema: ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  try {
    await requestQuerySchema.validateAsync(query);
    next();
  } catch (error: any) {
    const { debug } = query;

    const response = {
      status: ApiStatusCodes.FAILED,
      message: error.message,
    };

    if (debug === 'true') {
      response.message = error.message;
    }

    res.status(HTTPStatusCodes.BAD_REQUEST).send(response);
  }
};

export {
  validateQueryParams,
};
