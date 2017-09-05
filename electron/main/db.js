const db = require('./db.dev.js');
exports.startdb =()=>{
  console.log(`startdb....`);
  db.startdb();
}
exports.insertdb = (hexdata,callback)=>{
  console.log(`insertdb....`);
  db.insertdb(hexdata,callback);
}
exports.querydb = (query,options,callback)=>{
  console.log(`querydb....`);
  db.querydb(query,options,callback);
}
