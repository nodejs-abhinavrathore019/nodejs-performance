const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const hostName = process.env.MONGO_HOST;
const dbName = process.env.DB_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const mongoConfig = {
  hostName,
  dbName,
  username,
  password,
};

export {
  mongoConfig,
};
