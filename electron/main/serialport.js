const serialport = require('./serialport.prod.js');
// exports.start =()=>{
//   console.log(`init....`);
//   serialport.start();
// }
exports.start_measure = (arg,callback)=>{
  console.log(`start_measure....`);
  serialport.start_measure(arg,callback);
}
exports.setopen =(open,callback)=>{
  console.log(`start_measure....`);
  serialport.setopen(open,callback);
}
exports.start_verifydatameasure = (arg,callback)=>{
  console.log(`start_measure....`);
  serialport.start_verifydatameasure(arg,callback);
}
