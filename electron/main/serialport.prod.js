const SerialPort = require('serialport');
const ev = require('./ev.js');
const db = require('./db.js');
// 计算机与测量仪表串口连接，波特率115200,8位数据，1位开始位，1位停止位，无校验位。
const hex_data_len = 2404;
const openSerialWork = (portnumber)=>{
  const port = new SerialPort(portnumber, {
    autoOpen: true,
    baudRate:115200,
    dataBits:8,
    stopBits:1,
    parity:'none'
  });
//   55开始600个字节组成300个16位二进制数，高位在前低位在后，最高位为1表示负数，取低15位数，这个是正弦波电流数据，取第50个至249个，一个周期；
// EE开始600个字节是采样感应电压数据，高位在前低位在后组成300个16位二进制数，最高位为1表示负数，取低15位数，同样取第50个至249个，一个周期与前面相对应。
// 第一组数据作为横坐标，第二组数据纵坐标，横坐标上升阶段用一种颜色，下降阶段用另一种颜色表示，组成一组闭合曲线。
// 注意：第二组数据纵坐标是积分值，第2个是第1、2两个相加的值，第3个是1、2、3累加的值，负数则减。

  let hexdata = '';
  port.on('data', (data)=> {
    hexdata += data.toString('hex');
    if(hexdata.length >= hex_data_len){
      console.log(`获取到测量数据:${hexdata}`);
      ev.evEmitter.emit('get_buf',hexdata);
      hexdata = '';//清空
    }
  });

  port.on('open', ()=> {
    ev.evEmitter.on('write_buf',()=>{
      const cmdbuf = Buffer.from('AA33','hex');
      port.write(cmdbuf);
	  
	 const hexdata1 = `5500008064809880c480f681238151817e81a881dc82048237825f828c82b582d\
e8306832d83538375839883bb83df8402842a84508474849984b784d084e985018519852c853f854\
e856285728586859885a885bc85cb85db85e885f785fc86038607860e860d860f86148615861a861\
8861a86198617861a86178616860685e985c885ab858f856d854b8525850184d584ac8488845e843\
9841083ea83be8397836a8344831482ed82c0829282698239820e81df81b48186815a812b810180d\
380a7807a804c801c00100041007400a200d601040135015f019301be01f10221024b027902a002d\
102f4031f03420367038803b003d503f7042404490471049204b604d004eb04ff05150529053a054\
d055f05720585059605a605b705c905da05e805f205fb060006030607060b060f061106150614061\
6061506170618061606190613060305e405c605a7058a05690545051c04f404c904a004770450042\
503fb03d203a9037f0355032802fc02cf02a3027a024c022301f301c1019201640138010a00df00b\
000880056002c000000008060808e80bc80f08120814c817981a681d48201822d825d828582b482d\
d8305832a834f8373839483bb83da84028424844e8471849984b784d384ed8501851985298540855\
1856585738586859785a785bb85cb85dc85ea85f785fe86028607860b86108611861486168617861\
68619861a8619861886188616860485e885c885ab858f856c854a852084fc84d284ab8484845b843\
5840c83e183b983928365833b831082e482b6828a82618235820881da81ac8182814f812280f780c\
b80a0807380458013ee0000882d88308830882e882e882f8830882e883187e7849c81e4808480008\
000801d8035802880268035802c8024802280218021801d801880198018800a80008001800580018\
00080008000800080008000800080008000800080000000000000010000000000000003000100000\
0000002000200000001000200050007000a00130023003400390032002e0034003d0046004a00490\
04600450047004d005000520053005400560059005d006100620066006d0075007f02ab067c07190\
73007350736073507360737073807380738073707380737073707380739073806d904730213010a0\
06d0042006f00a500b40093006f00600068007b00870086007d007500740078007b007d007c007a0\
0790079007a007a007a007a007800740071006f006a006600630061005d0055003e0014000000070\
02400290016000e0019002500200012000b0008000000000000000080178019801c801b801a801c8\
01e80208020801e801f802080228038804a8050805c807a80ab80f3818e82e085f287c4881c88298\
82c882d882d882e882f882d882d882f882e882e882f88318830882d882e880785468217809c80008\
00080128031802c802a8038803180258020801e801d801a801480178017800e80008000800180038\
00080008000800080008000800080008000000000000000000000000000000100010002000100010\
000000100020004000300050004000300050012002a003b003c0031002a0030003f0048004a00480\
04500450049004e005100520053005500570059005d006000640068006f0078008d03b906b1071e0\
7310735073707370735`;
//ev.evEmitter.emit('get_buf',hexdata1);
    });
  });

  port.on('error', (err)=> {
    ev.evEmitter.removeAllListeners(['write_buf','get_buf']);
  });

}

exports.start = ()=>{
  openSerialWork('COM4');
}


exports.start_measure = (callback)=>{
   ev.evEmitter.removeAllListeners(['get_buf']);
   ev.evEmitter.on('get_buf',(hexdata)=>{
    db.insertdb(hexdata,(err,result)=>{
      callback(err,result);
    });
  });
  ev.evEmitter.emit('write_buf');
}
