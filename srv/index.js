const srvwebsocket = require('./src/srvws.js');
const config = require('./src/config');
let mongoose = require('mongoose');
let winston = require('./src/log/log.js');
let express = require('express');
let app = express();

let http = require('http').Server(app);
http.listen(config.listenport, ()=>{
  console.log('listening on *:' + config.listenport);
  winston.initLog();
});


mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  })

console.log(`rooturl:${config.rooturl}`);
console.log(`issmsdebug:${config.issmsdebug}`);

srvwebsocket.startsrv(http);

process.on('uncaughtException', (err)=> {
    console.log(err);
});
