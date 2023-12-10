import { NextFunction, Request, Response } from 'express';
import { loggerConfig } from '../../configs/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';

const ExpressErrorHandler = async (
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const httpStatus = error.status ?? HTTPStatusCodes.SERVER_ERROR;
  const data = error?.data ?? {};
  res.status(httpStatus).send({
    status: ApiStatusCodes.FAILED,
    message: error?.message,
    data,
    stack: loggerConfig.logLevel === 'debug' ? error.stack : undefined,
  });
};

export { ExpressErrorHandler };
