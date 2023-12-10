const dotenv = require('dotenv');
const path = require('path');
const { API } = require('../constants');
const { logger } = require('../utils/logger');

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const animal = process.env.ANIMAL || 'cat';

let baseUrl = '';

if (animal === 'cat') {
  baseUrl = API.CAT_BASE_URL;
} else {
  baseUrl = API.DOG_BASE_URL;
}

logger.info('baseUrl: ', baseUrl);

const apiConfig = {
  baseUrl,
};

module.exports = {
  apiConfig,
};
