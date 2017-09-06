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
exports.insertdb_verifydata =(arg,callback)=>{
  let dbModel = DBModels.VerifydataModel;
  dbModel.findOneAndUpdate({verifydataflag:arg.verifydataflag},{$set:arg},{
    upsert:true,new:true
  },(err,result)=>{
    dbModel.find({},callback);
  });
}

exports.insertdb =(arg,hexdata,callback)=>{
  let payload = parse.parsedata(hexdata);
  payload.createtimestring = moment().format("YYYY-MM-DD HH:mm:ss");
  payload.verifydataflag = arg.verifydataflag;
  let dbModel = DBModels.SerialportchartModel;
  let entity = new dbModel(payload);
  entity.save((err,newdata)=>{
    callback(err,newdata);
  });
}

exports.querydb =(query,options,callback)=>{
  options = options || {};
  options.select = {
    rawdata_55:1,
    rawdata_ee:1,
    createtimestring:1,
    _id:1
  };
  let dbModel = DBModels.SerialportchartModel;
  dbModel.paginate(query,options,(err,result)=>{
    callback(err,result);
    console.log(`发送到数据结束:${moment().format("YYYY-MM-DD HH:mm:ss")}`);
  });
}

exports.querydb_verifydata =(arg,callback)=>{
  let dbModel = DBModels.VerifydataModel;
  dbModel.find({},callback);
}
