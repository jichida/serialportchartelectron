const mongoose = require('mongoose');
const DBModels = require('./models.js');
const _ = require('lodash');
const moment = require('moment');
const parse = require('./parse.js');


exports.startdb = ()=>{

};


//======插入数据库======
exports.insertdb =(hexdata,callback)=>{
  const payload = parse.parsedata(hexdata);
  payload.createtimestring = moment().format("YYYY-MM-DD HH:mm:ss");
  callback(null,payload);
  // let dbModel = DBModels.SerialportchartModel;
  // let entity = new dbModel(payload);
  // entity.save((err,newdata)=>{
  //   callback(err,newdata);
  // });
}

exports.querydb =(query,options,callback)=>{
  // options = options || {};
  // options.select = {
  //   line1:1,
  //   line2:1,
  //   createtimestring:1,
  //   _id:1
  // };
  // let dbModel = DBModels.SerialportchartModel;
  // dbModel.paginate(query,options,(err,result)=>{
  //   callback(err,result);
  //
  //   console.log(`发送到数据结束:${moment().format("YYYY-MM-DD HH:mm:ss")}`);
  // });
}

exports.insertdb_verifydata =(arg,callback)=>{
  callback(null,[]);
}
