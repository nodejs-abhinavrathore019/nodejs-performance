import axios from 'axios';
import { ServerError } from '../../errors';
import {
  APIRequestType,
  APIResultType,
} from '../../../types/api';
import {
  logRequest,
  logError,
  logResponse,
} from '../log';

const requestGet = async (params: APIRequestType) => {
  const {
    url,
    headers = {},
    reqParams = {},
  } = params;

  let apiResult: APIResultType;
  let apiResponse: any = null;
  let apiError: any = null;

  const reqConfig = {
    url,
    method: 'GET',
    headers: {
      ...headers,
    },
    params: {
      ...reqParams,
    },
  };

  const finalUrl = await axios.getUri(reqConfig);

  try {
    return await axios(reqConfig).then((response: any) => {
      if ([200].includes(response.status) === false) {
        const errorObj = {
          message: `Request Failed, Invalid HTTP Status code ${response.status}`,
          data: response,
        };
        throw new ServerError(response.status, errorObj);
      }
      logRequest({
        ...reqConfig,
        ...params,
        url: finalUrl,
      });
      apiResponse = response.data;
      logResponse(params, apiResponse);

      apiResult = {
        status: response.status,
        response: apiResponse,
        error: apiError,
      };
      return apiResult;
    }).catch((error: any) => {
      apiError = new Error(error.message);
      let errorMessage = error.message;

      const { response, data } = error;

      if (response) {
        apiResponse = response;
        errorMessage = (response?.message) ? response?.message : errorMessage;
      }

      if (response?.data) {
        apiResponse = response.data;
        errorMessage = (apiResponse?.message) ? apiResponse?.message : errorMessage;
      }

      if (data?.data) {
        apiResponse = data?.data;
        errorMessage = (data?.message) ? data?.message : errorMessage;
      }

      apiResult = {
        status: response?.status ?? 0,
        response: apiResponse,
        error: new Error(errorMessage),
      };

      logRequest({
        ...reqConfig,
        ...params,
        url: finalUrl,
      });
      logError(params, errorMessage);

      return apiResult;
    });
  } catch (error: any) {
    apiError = new Error(error.message);
    apiResult = {
      status: 400,
      response: apiResponse,
      error: apiError,
    };

    logRequest({
      ...reqConfig,
      ...params,
      url: finalUrl,
    });
    logError(params, error.message);

    return apiResult;
  }
};

export {
  requestGet,
};
