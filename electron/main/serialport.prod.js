const SerialPort = require('serialport');
const ev = require('./ev.js');
const db = require('./db.js');
// 计算机与测量仪表串口连接，波特率115200,8位数据，1位开始位，1位停止位，无校验位。
const hex_data_len = 2404;
let port;
let portopened = false;
let hexdata = '';
const openSerialWork = (portnumber,callback)=>{
  port = new SerialPort(portnumber, {
    autoOpen: true,
    baudRate:115200,
    dataBits:8,
    stopBits:1,
    parity:'none'
  });
//   55开始600个字节组成300个16位二进制数，高位在前低位在后，最高位为1表示负数，取低15位数，这个是正弦波电流数据，取第50个至249个，一个周期；
// EE开始600个字节是采样感应电压数据，高位在前低位在后组成300个16位二进制数，最高位为1表示负数，取低15位数，同样取第50个至249个，一个周期与前面相对应。
// 第一组数据作为横坐标，第二组数据纵坐标，横坐标上升阶段用一种颜色，下降阶段用另一种颜色表示，组成一组闭合曲线。
// 注意：第二组数据纵坐标是积分值，第2个是第1、2两个相加的值，第3个是1、2、3累加的值，负数则减。


  port.on('data', (data)=> {
    hexdata += data.toString('hex');
	console.log(`readfrom serialport:${hexdata.length/2}`);
    if(hexdata.length >= hex_data_len){
      console.log(`get one data!`);
      ev.evEmitter.emit('get_buf',hexdata);
      hexdata = '';//清空
    }
  });

  port.on('open', ()=> {
    portopened = true;
	  console.log(`open port success!`);
    ev.evEmitter.on('write_buf',()=>{
	  console.log(`start write to serialport!`)
      const cmdbuf = Buffer.from('AA33','hex');
      port.write(cmdbuf);
    });
    callback(null,true);
  });

  port.on('error', (err)=> {
	   console.log(`serial port error!`)
     ev.evEmitter.removeAllListeners(['write_buf','get_buf']);
     portopened = false;
     callback(null,false);
  });

  port.on('close', ()=> {
	   console.log(`serial port close!`)
     ev.evEmitter.removeAllListeners(['write_buf','get_buf']);
     portopened = false;
  });
}

// exports.start = ()=>{
//   const serialport = process.env.SERIAL_PORT || 'COM4';
//   console.log(`open serialport:${serialport}`);
//   openSerialWork(serialport,(err,result)=>{
//
//   });
// }

exports.start_verifydatameasure = (arg,callback)=>{
    hexdata = '';
    ev.evEmitter.removeAllListeners(['get_buf']);
    ev.evEmitter.on('get_buf',(hexdata)=>{
      callback(null,hexdata);
   });
   ev.evEmitter.emit('write_buf');
}

exports.start_measure = (callback)=>{
   hexdata = '';
   ev.evEmitter.removeAllListeners(['get_buf']);
   ev.evEmitter.on('get_buf',(hexdata)=>{
   db.insertdb(hexdata,(err,result)=>{
      callback(err,result);
    });
  });
  ev.evEmitter.emit('write_buf');
}

exports.setopen =(open,callback)=>{
  if(open){
    if(portopened){
      callback(null,true);
      return;
    }
    const serialport = process.env.SERIAL_PORT || 'COM4';
    console.log(`open serialport:${serialport}`);
    openSerialWork(serialport,callback);
  }
  else{
    if(!portopened){
      callback(null,false);
      return;
    }
    port.close(()=>{
      callback(null,false);
    });
  }

}
