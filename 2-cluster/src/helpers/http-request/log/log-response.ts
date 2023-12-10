const logResponse = (params: any, response: any) => {
  const {
    logger,
  } = params;

  logger?.debug('HTTP RESPONSE:', JSON.stringify(response));
};

export {
  logResponse,
};
