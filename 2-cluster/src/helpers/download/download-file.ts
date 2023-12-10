import fs from 'fs';
import https from 'https';
import { logger } from '../../utils/logger';

type DownloadFileParams = {
  outputFileName: string;
  outputFilePath: string;
  remoteUrl: string;
};

type ResponseType = {
  downloadStatus: 1 | 0;
  error: any;
};

const downloadFile = async (params: DownloadFileParams) => {
  const {
    outputFileName,
    outputFilePath,
    remoteUrl,
  } = params;

  const response: ResponseType = {
    downloadStatus: 1,
    error: undefined,
  };

  const promise = new Promise((resolve) => {
    https.get(remoteUrl, (res: any) => {
      // Open file in local filesystem
      const localFile = `${outputFilePath}/${outputFileName}`;
      // const localFile = `${outputFilePath}/`;
      const file = fs.createWriteStream(localFile);

      // Write data into local file
      res.pipe(file);

      // Close the file
      file.on('finish', () => {
        file.close();
        logger.info('File downloaded!');
        resolve(response);
      });
    }).on('error', (error: any) => {
      logger.error('Error: ', error.message);
      response.downloadStatus = 0;
      response.error = error;
      resolve(response);
    });
  });

  await promise;
  return response;
};

export {
  downloadFile,
};
