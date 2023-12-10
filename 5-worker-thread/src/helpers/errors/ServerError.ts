import { HTTPStatusCodes } from '../../constants';

class ServerError extends Error {
  status;

  data;

  constructor(message: any, data?: any) {
    super(message);
    this.status = HTTPStatusCodes.SERVER_ERROR;
    this.message = message;
    this.name = 'Server Error';
    this.data = data;
  }
}

export {
  ServerError,
};
