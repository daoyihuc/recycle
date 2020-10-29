const NODE_ENV = 'prod'
const ENV = require(`./_config_${NODE_ENV}`)

module.exports = {
    BASE_URL: ENV.BASE_URL,
    VERSION: 'v1',
    APP_ID: 'wx523dbd3325d11619',
    AMAP_KEY: '2bebce8bb1bd74910edf6a1e75987b20'
}