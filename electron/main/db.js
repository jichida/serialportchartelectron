const mongoose = require('mongoose');
let DBModels = require('./models.js');
const _ = require('lodash');

mongoose.Promise = global.Promise;

exports.startdb = ()=>{
  const mongodburl = 'mongodb://localhost/serialportdata';
  mongoose.connect(mongodburl,{
      useMongoClient: true,
      // This options is 1 second by default, its possible the ha
      // takes longer than 30 seconds to recover.
      reconnectInterval: 5000,
      // This options is 30 by default, why not make it 60
      reconnectTries: Number.MAX_VALUE
  });
};

const parsedata = (hexdata)=>{
  const bufstrx = hexdata.substr(0,hexdata.length/2);
  const bufstry = hexdata.substr(hexdata.length/2);
  //2404
  // const hex_x = _.trim(data_x);
  // const hex_y = _.trim(data_y);
  console.log(`hex_x===>${bufstrx},\n字节数:${bufstrx.length}`);
  console.log(`hex_y===>${bufstry},\n字节数:${bufstrx.length}`);
  //---------解析buf-------------
  const bufx = Buffer.from(bufstrx, 'hex');
  const bufy = Buffer.from(bufstry, 'hex');

  const getdata = (buf)=>{
    if(buf.length < 601){
      return {
        result:false,
        msg:'字节数不够'
      };
    }
    if(buf[0] !== 0x55 && buf[0] !== 0xEE){
      return {
        result:false,
        msg:'不是以0x55开头'
      };
    }
    let data = [];//取第50个至249个
    for(let i = 49 ;i < 249 ;i++){
      let u1 = buf.readUInt8(1+i*2);
      let u2 = buf.readUInt8(1+i*2+1);
      let isminus = u1 >> 7;
      // console.log(`u1:${u1},u2:${u2},isminus:${isminus}`);
      let value;
      if(isminus > 0){
        u1 = u1 & 0x7F;
        // console.log(`u1:${u1}`);
        value = (u1 << 8) + u2;
        value = -value;
      }
      else{
        value = (u1 << 8) + u2;
        // console.log(`value:${value}`);
      }

      data.push(value);
    }

    let type = (buf[0] === 0x55)?'x':'y';
    return {
      type,
      data
    };
  };
  const datax = getdata(bufx);
  console.log(`result==>${JSON.stringify(datax)}`);
  const datay = getdata(bufy);
  console.log(`result==>${JSON.stringify(datay)}`);

  const sumx = _.sum(datax.data);
  const sumy = _.sum(datay.data);
  let targetx = [];
  _.map(datay.data,(item)=>{
    let data = item*200/sumy;
    targetx.push(data);
  });
  console.log(`targetx===>${JSON.stringify(targetx)}\n`);

  let data = [];
  let tee = 0;
  let t55 = 0;
  _.map(datax.data,(v,index)=>{
    t55 = t55+datax.data[index];
    tee = tee+datay.data[index];
    data.push( { 55:v, ee: datay.data[index],tee:tee,t55:t55, amt: index});
  });
  const payload = {
    rawdatahex:hexdata,
    chartdata:data,
    currealtimedata:{
      data55:datax.data,
      dataee:datay.data
    }
  };
  return payload;
}

//======插入数据库======
exports.insertdb =(hexdata,callback)=>{
  const payload = parsedata(hexdata);
  console.log(`获取到数据:${payload}`);
  let dbModel = DBModels.SerialportchartModel;
  let entity = new dbModel(payload);
  entity.save((err,newdata)=>{
    callback(err,newdata);
  });
}

exports.querydb =(query)=>{

}
