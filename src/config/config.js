import baseConfig from './config.base.js';
const envConfig = require('./config.' + process.env.NODE_ENV + '.js').default;
const config = Object.assign(baseConfig, envConfig);
export default config;
