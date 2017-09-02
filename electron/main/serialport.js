const serialport = require('./serialport.dev.js');
exports.start =()=>{
  console.log(`初始化....`);
  serialport.start();
}
exports.start_measure = (callback)=>{
  console.log(`开始测量....`);
  serialport.start_measure(callback);
}
