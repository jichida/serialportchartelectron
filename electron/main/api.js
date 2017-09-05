const _ = require('lodash');
const serialport = require('./serialport.js');
const db = require('./db');
const {ipcMain} = require('electron');

exports.start = ()=>{
  ipcMain.on('getrealtimedata', (event, arg) => {
    serialport.start_measure((err,result)=>{
        console.log(`最终获取到数据===>${JSON.stringify(result)}`);
        event.sender.send('getrealtimedata_result', JSON.stringify({
            payload:{
              _id:result._id,
              rawdata_55:result.rawdata_55,
              rawdata_ee:result.rawdata_ee,
              createtimestring:result.createtimestring
            }
        })
    );
    });

  })

  ipcMain.on('queryrealtimedata', (event, arg) => {
    try{
      if(typeof arg === 'string'){
          arg = JSON.parse(arg);
      }
    }
    catch(e){
      console.log(e);
    }
    let {query,option} = arg;
    query = query || {};
    option = option || {};
    db.querydb(query,option,(err,result)=>{
        console.log(`最终获取到数据===>${JSON.stringify(result)}`);
        event.sender.send('queryrealtimedata_result', JSON.stringify({
          payload:result
        }));
    });
  });

  ipcMain.on('serialport', (event, arg) => {
    try{
      if(typeof arg === 'string'){
          arg = JSON.parse(arg);
      }
    }
    catch(e){
      console.log(e);
    }
    let {open} = arg;
    serialport.setopen(open,(err,result)=>{
      event.sender.send('serialport_result', JSON.stringify({
        payload:result
      }));
    });
  });

}

//
// exports.getrealtimedata= (callback)=>{
//   console.log(`getrealtimedata===>`);
//   serialport.start_measure((err,result)=>{
//       console.log(`最终获取到数据===>${JSON.stringify(result)}`);
//       callback({
//         cmd:'getrealtimedata_result',
//         payload:{
//           _id:result._id,
//           line1:result.line1,
//           line2:result.line2,
//           createtimestring:result.createtimestring
//         }
//       });
//   });
// }
//
//
// exports.queryrealtimedata= (query,option,callback)=>{
//   console.log(`getrealtimedata===>query:${JSON.stringify(query)}`);
//   console.log(`getrealtimedata===>option:${JSON.stringify(option)}`);
//   query = query || {};
//   option = option || {};
//   db.querydb(query,option,(err,result)=>{
//       console.log(`最终获取到数据===>${JSON.stringify(result)}`);
//       callback({
//         cmd:'queryrealtimedata_result',
//         payload:result
//       });
//   });
// }
