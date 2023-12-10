/* eslint-disable no-console */
const logRequest = (params: any) => {
  const {
    method,
    url,
    headers = {},
    data = {},
    logger,
  } = params;

  console.log('');

  logger?.debug(`HTTP URL [${method}]: ${url}`);

  logger?.debug('HTTP REQUEST HEADERS:', JSON.stringify(headers));

  logger?.debug('HTTP REQUEST PARAMS:', JSON.stringify(data));
};

export {
  logRequest,
};
