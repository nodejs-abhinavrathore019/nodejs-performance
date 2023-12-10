type PaginationMeta = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
};

type PaginationPrev = {
  page: number;
  limit: number;
};

type PaginationNext = {
  page: number;
  limit: number;
};

type PaginationInfo = {
  meta?: PaginationMeta;
  prev?: PaginationPrev;
  next?: PaginationNext;
};

export {
  PaginationInfo,
  PaginationMeta,
  PaginationPrev,
  PaginationNext,
};
