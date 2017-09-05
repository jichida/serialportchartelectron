const serialport = require('./serialport.dev.js');
// exports.start =()=>{
//   console.log(`init....`);
//   serialport.start();
// }
exports.start_measure = (callback)=>{
  console.log(`start_measure....`);
  serialport.start_measure(callback);
}
exports.setopen =(open,callback)=>{
  console.log(`start_measure....`);
  serialport.setopen(open,callback);
}
