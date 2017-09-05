const serialport = require('./serialport.prod.js');
exports.start =()=>{
  console.log(`init....`);
  serialport.start();
}
exports.start_measure = (callback)=>{
  console.log(`start_measure....`);
  serialport.start_measure(callback);
}
