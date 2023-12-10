import { PaginationInfo } from './Pagination';

type DataWithPagination = {
  totalCount?: number,
  pagination?: PaginationInfo
  [key: string]: any

};

export { DataWithPagination };
