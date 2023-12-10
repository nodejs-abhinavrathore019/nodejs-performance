import { DataWithPagination } from './DataWithPagination';
import { ResponseType } from './Response';

type ResponseWithPageType = ResponseType & {
  data: DataWithPagination
};

export { ResponseWithPageType };
