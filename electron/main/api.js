const _ = require('lodash');
const serialport = require('./serialport.js');

exports.getrealtimedata= (callback)=>{
  console.log(`getrealtimedata===>`);
  serialport.start_measure((err,result)=>{
      console.log(`最终获取到数据===>${JSON.stringify(result)}`);
      callback({
        cmd:'getrealtimedata_result',
        payload:{chartdata:result.chartdata}
      });
  });
}
