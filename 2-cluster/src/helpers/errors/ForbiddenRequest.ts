import { HTTPStatusCodes } from '../../constants';

class ForbiddenRequestError extends Error {
  status;

  data;

  constructor(message: any, data?: any) {
    super(message);
    this.status = HTTPStatusCodes.FORBIDDEN;
    this.message = message;
    this.name = 'Forbidden Request';
    this.data = data;
  }
}

export {
  ForbiddenRequestError,
};
