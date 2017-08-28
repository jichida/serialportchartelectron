let winston = require('./log/log.js');
const config = require('./config.js');


const handleserialport= require('./handler/index.js');

let startwebsocketsrv = (http)=>{
  let io = require('socket.io')(http);

  io.on('connection', (socket)=>{
    console.log('a user connected');

    let ctx = {};//for each connection
    // socketsubfn.usersubfn(socket,ctx);
    //ctx.tokensubscribe = PubSub.subscribe('allmsg', ctx.userSubscriber);

    socket.on('pc',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'pc';
      }
      console.log('pc get message:' + JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      handleserialport(socket,payload,ctx);
    });


    socket.on('error',(err)=>{
      console.log("socket err:" + JSON.stringify(err));
      socket.disconnect(true);
    });

    socket.on('disconnect', ()=> {
      console.log("socket disconnect!");
      // PubSub.unsubscribe( ctx.userSubscriber );
    });
  });

};

exports.startsrv = startwebsocketsrv;
