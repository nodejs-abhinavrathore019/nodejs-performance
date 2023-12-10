import { ResponseType } from '../../types/response';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
// eslint-disable-next-line import/no-relative-packages
import catByIdTestData from '../../../../assets/cat-by-id-response.json';

type GetCatByIdParamsType = {
  id: string | number;
};

type GetCatByIdResultType = ResponseType & {
  data: {
    cat?: any
  },
};

const getCatById = async (params: GetCatByIdParamsType) => {
  const res: GetCatByIdResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      processId: process.pid,
    },
  };

  const response = catByIdTestData;

  res.data.cat = response.data.cat;
  return res;
};

export {
  getCatById,
};
