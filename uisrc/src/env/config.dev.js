let localhost = true;
let config = {
    serverurl:localhost?'http://localhost:12000':'http://yunqi.com28.cn:12000',
    requesttimeout:5000,
    appversion:'1.0.0',
    sendlocationinterval:20000,
};

export default config;
