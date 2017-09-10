const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

mongoose.Promise = global.Promise;
//系统设置
let SerialportchartSchema = new Schema({
  created_at:{ type: Date, default:new Date()},
  rawdata_hex: String,
  rawdata_55:[],
  rawdata_ee:[],
  verifydataflag:Number,
  createtimestring:String,
  verifydata:{
    created_at:{ type: Date, default:new Date()},
    rawdata_hex: String,
    rawdata_55:[],
    rawdata_ee:[],
    verifydataflag:Number,
    createtimestring:String,
  }
});

SerialportchartSchema.plugin(mongoosePaginate);
let SerialportchartModel =mongoose.model('serialportchart',  SerialportchartSchema);


let VerifydataSchema = new Schema({
  created_at:{ type: Date, default:new Date()},
  rawdata_hex: String,
  rawdata_55:[],
  rawdata_ee:[],
  verifydataflag:Number,
  createtimestring:String,
});
VerifydataSchema.plugin(mongoosePaginate);
let VerifydataModel =mongoose.model('verifydata',  VerifydataSchema);


exports.SerialportchartSchema = SerialportchartSchema;
exports.SerialportchartModel = SerialportchartModel;

exports.VerifydataSchema = VerifydataSchema;
exports.VerifydataModel = VerifydataModel;
