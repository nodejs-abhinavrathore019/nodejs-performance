import { HTTPStatusCodes } from '../../constants';

class BadRequestError extends Error {
  status;

  data;

  constructor(message: any, data?: any) {
    super(message);
    this.status = HTTPStatusCodes.BAD_REQUEST;
    this.message = message;
    this.name = 'Bad Request';
    this.data = data;
  }
}

export {
  BadRequestError,
};
