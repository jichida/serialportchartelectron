const usedb = process.env.USE_DB;
const db = usedb==='true'?require('./db.prod.js'):require('./db.dev.js');
exports.startdb =()=>{
  console.log(`[usedb:${usedb}]startdb....`);
  db.startdb();
}
exports.insertdb = (arg,hexdata,callback)=>{
  console.log(`[usedb:${usedb}]insertdb....`);
  db.insertdb(arg,hexdata,callback);
}
exports.querydb = (query,options,callback)=>{
  console.log(`[usedb:${usedb}]querydb....`);
  db.querydb(query,options,callback);
}
exports.insertdb_verifydata = (arg,callback)=>{
  console.log(`[usedb:${usedb}]insertdb_verifydata....`);
  db.insertdb_verifydata(arg,callback);
}
exports.querydb_verifydata = (arg,callback)=>{
  console.log(`[usedb:${usedb}]querydb_verifydata....`);
  db.querydb_verifydata(arg,callback);
}
