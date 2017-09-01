const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

mongoose.Promise = global.Promise;
//系统设置
let SerialportchartSchema = new Schema({
  created_at:{ type: Date, default:new Date()},
  rawdatahex: String,
  line1:[],
  line2:[],
  createtimestring:String,
});

SerialportchartSchema.plugin(mongoosePaginate);
let SerialportchartModel =mongoose.model('serialportchart',  SerialportchartSchema);

exports.SerialportchartSchema = SerialportchartSchema;
exports.SerialportchartModel = SerialportchartModel;
