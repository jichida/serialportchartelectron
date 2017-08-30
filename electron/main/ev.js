const EventEmitter = require('events');
class ApiSerialportEmitter extends EventEmitter {}
const ApiSerialportEmitterInstance = new ApiSerialportEmitter();

exports.evEmitter = ApiSerialportEmitterInstance;
