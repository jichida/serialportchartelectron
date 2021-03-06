const _ = require('lodash');
const serialport = require('./serialport.js');
const db = require('./db');
const parse = require('./parse.js');
const {ipcMain} = require('electron');
const moment = require('moment');

exports.start = ()=>{
  ipcMain.on('getrealtimedata', (event, arg) => {
    try{
      if(typeof arg === 'string'){
          arg = JSON.parse(arg);
      }
    }
    catch(e){
      console.log(e);
    }
    console.log(`getrealtimedata:${JSON.stringify(arg)}`);
    serialport.start_measure(arg,(err,result)=>{
        let payload = {
          _id:result._id,
          rawdata_55:result.rawdata_55,
          rawdata_ee:result.rawdata_ee,
          verifydataflag:result.verifydataflag,
          createtimestring:result.createtimestring,
          verifydata:result.verifydata
        };
        console.log(`getrealtimedata===>${JSON.stringify(payload)}`);
        event.sender.send('getrealtimedata_result', JSON.stringify({
            payload
        })
    );
    });

  })

  ipcMain.on('querydata', (event, arg) => {
    try{
      if(typeof arg === 'string'){
          arg = JSON.parse(arg);
      }
    }
    catch(e){
      console.log(e);
    }
    console.log(`querydata:${JSON.stringify(arg)}`);
    let {query,option} = arg;
    query = query || {};
    option = option || {};
    db.querydb(query,option,(err,result)=>{
        let payload = result;
        console.log(`querydata===>${JSON.stringify(payload)}`);
        event.sender.send('querydata_result', JSON.stringify({
          payload
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
    console.log(`serialport:${JSON.stringify(arg)}`);
    let {open} = arg;
    serialport.setopen(open,(err,result)=>{
      let payload = result;
      console.log(`serialport===>${JSON.stringify(payload)}`);
      event.sender.send('serialport_result', JSON.stringify({
        payload
      }));
    });
  });


    ipcMain.on('verifydata', (event, arg) => {
      try{
        if(typeof arg === 'string'){
            arg = JSON.parse(arg);
        }
      }
      catch(e){
        console.log(e);
      }
      console.log(`verifydata:${JSON.stringify(arg)}`);
      serialport.start_verifydatameasure(arg,(err,hexdata)=>{
        let payload = parse.parsedata(hexdata);
        payload.createtimestring = moment().format("YYYY-MM-DD HH:mm:ss");
        payload.verifydataflag = arg.verifydataflag;
        console.log(`verifydata===>${JSON.stringify(payload)}`);
        event.sender.send('verifydata_result', JSON.stringify({
          payload
        }));

      });
    });


      ipcMain.on('verifydatasave', (event, arg) => {
        try{
          if(typeof arg === 'string'){
              arg = JSON.parse(arg);
          }
        }
        catch(e){
          console.log(e);
        }
        console.log(`verifydatasave:${JSON.stringify(arg)}`);
        db.insertdb_verifydata(arg,(err,result)=>{
          console.log(`verifydatasave===>${JSON.stringify(result)}`);
          event.sender.send('verifydatasave_result', JSON.stringify({
            payload:result
          }));
        });
      });

      ipcMain.on('queryverifydata', (event, arg) => {
        try{
          if(typeof arg === 'string'){
              arg = JSON.parse(arg);
          }
        }
        catch(e){
          console.log(e);
        }
        console.log(`queryverifydata:${JSON.stringify(arg)}`);
        db.querydb_verifydata(arg,(err,result)=>{
          let payload = result;
          console.log(`queryverifydata===>${JSON.stringify(payload)}`);
          event.sender.send('queryverifydata_result', JSON.stringify({
            payload
          }));
        });
      });


}
