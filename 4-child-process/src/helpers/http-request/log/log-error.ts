const logError = (params: any, error: any) => {
  const {
    logger,
  } = params;

  let errorObj = error;

  if (typeof error === 'string') {
    errorObj = {
      error,
    };
  }
  logger?.error('HTTP ERROR:', errorObj);
};

export {
  logError,
};
