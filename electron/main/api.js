const _ = require('lodash');
const serialport = require('./serialport.js');
const db = require('./db');

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


exports.queryrealtimedata= (query,option,callback)=>{
  console.log(`getrealtimedata===>query:${JSON.stringify(query)}`);
  console.log(`getrealtimedata===>option:${JSON.stringify(option)}`);
  query = query || {};
  option = option || {};
  db.querydb(query,option,(err,result)=>{
      console.log(`最终获取到数据===>${JSON.stringify(result)}`);
      callback({
        cmd:'queryrealtimedata_result',
        payload:{chartdata:result}
      });
  });
}
