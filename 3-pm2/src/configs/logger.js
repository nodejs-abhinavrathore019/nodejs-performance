const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const logLevel = process.env.LOG_LEVEL || 'info';

const loggerConfig = {
  logLevel,
};

module.exports = {
  loggerConfig,
};
