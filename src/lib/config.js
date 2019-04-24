const env = process.env.NODE_ENV || 'development';
const cfg = {
    "common"        : require('../config/common'),
    "production"    : require('../config/production'),
    "development"   : require('../config/development'),
};

const config = {
    env,
    path: require('path').normalize(__dirname + '/..'),
    ...cfg['common'],
    ...cfg[env],
};

console.log('当前配置: ', config);

export default config;
