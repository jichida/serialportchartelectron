"use strict";

const winston = require('../log/log.js');
const SerialPort = require('serialport');
const moment  = require('moment');
const ev = require('../event/index');
let isserialportopen = false;
let cursocket;

let savedataitemtodb = (dataobj,GlobalEmitter)=>{

};

exports.openSerialWork = (portnumber,GlobalEmitter,socket)=>{
  winston.getlog().info("start create port:" + portnumber);

  if(isserialportopen){
    return;
  }
  cursocket = socket;
  port = new SerialPort(portnumber, {
    autoOpen: true,
    baudRate:115200,
    dataBits:8,
    stopBits:1,
    parity:'none'
  });

  let startrecv = ()=>{
    let recvbuf = new Buffer(0,'binary');
    port.on('data', (data)=> {
        //   recvbuf = Buffer.concat([recvbuf, new Buffer(data,'binary')]);
        //  while(recvbuf.length >= 4){
        //      if(recvbuf[0] === 0x55 && recvbuf[1] === 0xAA){
        //         let datalen = recvbuf[2];
        //         let newbuflen = 2 + datalen;
        //         if(recvbuf.length >= newbuflen){
        //           //parse data.
        //           let newbuf = new Buffer(newbuflen,'binary');
        //           recvbuf.copy(newbuf, 0, 0, newbuflen);
         //
        //           let leftbuf = new Buffer(recvbuf.length - newbuflen,'binary');
        //           recvbuf.copy(leftbuf, 0, newbuflen,recvbuf.length);
         //
        //           recvbuf = leftbuf;
         //
        //           let dbdataitem = pm60100protocol.parseBuffer(newbuf);
        //         //  winston.getlog().info("取到一个数据:" + JSON.stringify(dbdataitem));
        //           savedataitemtodb(dbdataitem,GlobalEmitter);
        //           //renew buffer
        //           continue;
        //         }
        //       }
        //       else{
        //         //error
        //         let ismatched = false;
        //         winston.getlog().info("关闭链接.raw数据:" + recvbuf.toString('hex'));
        //         for(let i=0;i<recvbuf.length-1;i++){
        //           if(recvbuf[i] === 0x55 && recvbuf[i+1] === 0xAA){
        //             let newbuf = new Buffer(recvbuf.length-i,'binary');
        //             recvbuf.copy(newbuf, 0, i, recvbuf.length-i);
        //             recvbuf = newbuf;
        //             ismatched = true;
        //             break;
        //           }
        //         }
        //         if(ismatched){
        //           winston.getlog().info("丢弃并修复数据到:" + recvbuf.toString('hex'));
        //           continue;
        //         }
        //         else{
        //           recvbuf = new Buffer(0,'binary');
        //         }
        //       }
        //       break;
        //    }

        });
  };

  port.on('open', ()=> {
      isserialportopen = true;
      winston.getlog().info("串口打开!" + portnumber);
      //
      //
      // GlobalEmitter.SerialportEmitter.on('writebuf', (data) => {
      //
      // });
  });




  // open errors will be emitted as an error event
  port.on('error', (err)=> {
    //删除listeners!
    winston.getlog().info('串口错误(下次重新打开)=================>', err.message);
  });

}

exports.isserialportopen = ()=>{
  return  isserialportopen;
};
