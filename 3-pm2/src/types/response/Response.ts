import { Data } from './Data';

type ResponseType = {
  httpStatus: number,
  apiStatus: number,
  message: string,
  data: Data,
};
export { ResponseType };
