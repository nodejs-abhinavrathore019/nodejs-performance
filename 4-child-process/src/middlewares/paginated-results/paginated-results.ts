import { Request, Response } from 'express';
import {
  DataWithPagination,
  PaginationInfo,
  ResponseType,
} from '../../types/response';

const getPaginatedResults = (key: string) => async (req: Request, res: Response) => {
  const {
    page = 1,
    limit,
  } = req.query;

  const data: DataWithPagination = res?.locals?.data ?? {};
  let results = data[`${key}`];
  const count = data.totalCount ?? results?.length ?? 0;
  delete data.totalCount;

  if (!results) {
    results = [];
  }

  const resultLimit = limit ?? count;

  const response: ResponseType = res.locals as any ?? {};

  const {
    httpStatus,
    apiStatus,
    message,
  } = response;

  const pageNum = parseInt(String(page), 10);
  const limitNum = parseInt(resultLimit, 10);

  const paginationInfo: PaginationInfo = {};

  const totalResults = count ?? results.length;
  const totalPages = Math.ceil(totalResults / limitNum);
  const perPage = limitNum;
  const currentPage = pageNum;

  const meta = {
    currentPage: Number.isNaN(totalPages) ? 0 : currentPage,
    perPage,
    totalPages: Number.isNaN(totalPages) ? 0 : totalPages,
    totalResults,
  };

  paginationInfo.meta = meta;

  if (pageNum < totalPages) {
    paginationInfo.next = {
      page: pageNum + 1,
      limit: limitNum,
    };
  }

  if (pageNum > 1) {
    paginationInfo.prev = {
      page: pageNum - 1,
      limit: limitNum,
    };
  }

  res.status(httpStatus)
    .send({
      status: apiStatus,
      message,
      data: {
        ...data,
        pagination: paginationInfo,
      },
    });
};

export {
  getPaginatedResults,
};
