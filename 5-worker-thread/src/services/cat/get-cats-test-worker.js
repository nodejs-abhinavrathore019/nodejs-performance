/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
// worker_threads only excepts js or jsx files. So we have to create one js
// file which read code from ts file and execute it as JavaScript code
// and that’s why we need ts-node module.
const path = require('path');
const { workerData } = require('worker_threads');
require('ts-node').register();

const workerPath = path.resolve(__dirname, workerData.path);
require(workerPath);
