import { Request, Response, NextFunction } from 'express';
import { fork } from 'child_process';
import { logger } from '../../utils/logger';
// import { getCatsTest } from '../../services/cat/get-cats-test';

const getCatsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {
    reqNum,
  } = req.query;

  const params = {
    reqNum: (!Number.isNaN(Number(reqNum))) ? Number(reqNum) : undefined,
  };
  const filePath = `${__dirname}/../../services/cat/get-cats`;
  const childProcess = fork(filePath);
  childProcess.on('message', (response: any) => {
    logger.debug('response', response);
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
  });

  childProcess.send({
    message: 'GET_TEST_CATS',
    params,
  });
};

export {
  getCatsHandler,
};
