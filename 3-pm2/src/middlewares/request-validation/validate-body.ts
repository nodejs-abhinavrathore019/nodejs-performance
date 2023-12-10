import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';

const validateBody = (requestBodySchema: ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  try {
    await requestBodySchema.validateAsync(body);
    next();
  } catch (error: any) {
    const { debug } = body;

    const response = {
      status: ApiStatusCodes.FAILED,
      message: error.message,
    };

    if (debug === true) {
      response.message = error.message;
    }

    res.status(HTTPStatusCodes.BAD_REQUEST).send(response);
  }
};

export {
  validateBody,
};
