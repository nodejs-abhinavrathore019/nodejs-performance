import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { logger } from '../../utils/logger';
// eslint-disable-next-line import/no-relative-packages
import catsTestData from '../../../../assets/cats-response.json';

// total records available in db
const TOTAL_RECORDS = 10;

type GetCatsParamsType = {
  reqNum: undefined | number;
};

type GetCatsResultType = ResponseWithPageType & {
  data: {
    cats?: any[]
  },
};

const runVeryLongTaskInJS = (reqNum: undefined | number, delay: number) => {
  const delayInMillis = delay * 1000;
  const endTime = Date.now() + delayInMillis;
  let delta = endTime - Date.now();
  while (delta > 0) {
    // event loop is blocked as the JS code will run on call-stack
    delta = endTime - Date.now();
  }
};

const getCats = async (params: GetCatsParamsType) => {
  const {
    reqNum,
  } = params;

  const res: GetCatsResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      totalCount: TOTAL_RECORDS,
      cats: [],
      processId: process.pid,
    },
  };

  const response = catsTestData;

  runVeryLongTaskInJS(reqNum, 10);
  logger.info(`/test/cats REQ No [ ${reqNum} ] ProcessId [${process.pid}]`);

  res.data.cats = response.data.cats;
  return res;
};

export {
  getCats,
};
