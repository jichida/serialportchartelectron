let config =  {
  listenport:process.env.port ||12000,
  rooturl:process.env.rooturl || 'http://localhost:12000',
  issmsdebug:process.env.issmsdebug || false,
  publishdirapp:'../../../bms/app/build',
  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  mongodburl:process.env.dburl || 'mongodb://localhost/serialportdata',
};



module.exports = config;
