const EventEmitter = require('events');
class SocketSerialportEmitter extends EventEmitter {}
const SocketSerialportInstance = new SocketSerialportEmitter();

exports.evEmitter = SocketSerialportInstance;
