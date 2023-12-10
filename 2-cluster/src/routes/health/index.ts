import { Request, Response } from 'express';
import { HTTPStatusCodes } from '../../constants';

const heathCheckHandler = (req: Request, res: Response) => {
  res.status(HTTPStatusCodes.OK).send({
    time: new Date().getTime(),
  });
};

export {
  heathCheckHandler,
};
