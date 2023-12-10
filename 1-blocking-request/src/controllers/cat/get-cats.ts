import { Request, Response, NextFunction } from 'express';
import { getCats } from '../../services/cat/get-cats';

const getCatsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {
    reqNum,
  } = req.query;

  const params = {
    reqNum: (!Number.isNaN(Number(reqNum))) ? Number(reqNum) : undefined,
  };

  const response = await getCats(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  getCatsHandler,
};
