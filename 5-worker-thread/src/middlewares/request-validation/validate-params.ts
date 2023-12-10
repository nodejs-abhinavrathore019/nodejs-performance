import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';

const validateParams = (requestParamsSchema: ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;

  try {
    await requestParamsSchema.validateAsync(params);
    next();
  } catch (error: any) {
    const { debug } = params;

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
  validateParams,
};
