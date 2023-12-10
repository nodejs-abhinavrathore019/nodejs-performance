import { Request, Response, NextFunction } from 'express';
import { Worker, isMainThread } from 'node:worker_threads';
// import { getCats } from '../../services/cat/get-cats';
import { logger } from '../../utils/logger';

const getCatsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {
    reqNum,
  } = req.query;

  const params = {
    reqNum: (!Number.isNaN(Number(reqNum))) ? Number(reqNum) : undefined,
  };
  const filePath = `${__dirname}/../../services/cat/get-cats-test-worker`;
  const worker = new Worker(filePath, {
    workerData: {
      path: `${__dirname}/../../services/cat/get-cats`,
      params,
    },
  });

  worker.on('message', (response: any) => {
    logger.debug('isMainThread', isMainThread);
    logger.debug('worker response', response);
    const {
      httpStatus,
      apiStatus,
      message,
      data,
    } = response;

    worker.terminate();

    res.status(httpStatus).send({
      status: apiStatus,
      message,
      data,
    });
  });
};

export {
  getCatsHandler,
};
