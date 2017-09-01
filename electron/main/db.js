const mongoose = require('mongoose');
const DBModels = require('./models.js');
const _ = require('lodash');
const moment = require('moment');
const parse = require('./parse.js');
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


//======插入数据库======
exports.insertdb =(hexdata,callback)=>{
  const payload = parse.parsedata(hexdata);
  payload.createtimestring = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(`获取到数据:${JSON.stringify(payload)}`);
  let dbModel = DBModels.SerialportchartModel;
  let entity = new dbModel(payload);
  entity.save((err,newdata)=>{
    callback(err,newdata);
  });
}

exports.querydb =(query,options,callback)=>{
  let dbModel = DBModels.SerialportchartModel;
  dbModel.paginate(query,options,(err,result)=>{
    callback(err,result);
  });
}
