const _ = require('lodash');
exports.parsedata = (hexdata)=>{
  const bufstrx = hexdata.substr(0,hexdata.length/2);
  const bufstry = hexdata.substr(hexdata.length/2);
  //2404
  // const hex_x = _.trim(data_x);
  // const hex_y = _.trim(data_y);
  console.log(`hex_x===>${bufstrx},\n:${bufstrx.length}`);
  console.log(`hex_y===>${bufstry},\n:${bufstrx.length}`);
  //---------����buf-------------
  const bufx = Buffer.from(bufstrx, 'hex');
  const bufy = Buffer.from(bufstry, 'hex');

  const getdata = (buf)=>{
    if(buf.length < 601){
      return {
        result:false,
        msg:'length is too short'
      };
    }
    if(buf[0] !== 0x55 && buf[0] !== 0xEE){
      return {
        result:false,
        msg:'error header'
      };
    }
    let data = [];//ȡ��50����249��
    for(let i = 49 ;i < 249 ;i++){
      let u1 = buf.readUInt8(1+i*2);
      let u2 = buf.readUInt8(1+i*2+1);
      let isminus = u1 >> 7;
      // console.log(`u1:${u1},u2:${u2},isminus:${isminus}`);
      let value;
      if(isminus > 0){
        u1 = u1 & 0x7F;
        // console.log(`u1:${u1}`);
        value = (u1 << 8) + u2;
        value = -value;
      }
      else{
        value = (u1 << 8) + u2;
        // console.log(`value:${value}`);
      }

      data.push(value);
    }

    let type = (buf[0] === 0x55)?'x':'y';
    return {
      type,
      data
    };
  };
  const datax = getdata(bufx);
  console.log(`result==>${JSON.stringify(datax)},length:${datax.data.length}`);
  const datay = getdata(bufy);
  console.log(`result==>${JSON.stringify(datay)},length:${datay.data.length}`);

  // const sumx = _.sum(datax.data);
  // const sumy = _.sum(datay.data);
  // let targetx = [];
  // _.map(datay.data,(item)=>{
  //   let data = item*200/sumy;
  //   targetx.push(data);
  // });
  // console.log(`targetx===>${JSON.stringify(targetx)}\n`);

  let line1 = [];
  let line2 = [];
  let tee = 0;
  let t55 = 0;
  let isline1 = true;
  _.map(datax.data,(v,index)=>{
    t55 = t55+datax.data[index];
    tee = tee+datay.data[index];
   // data.push( { 55:datax.data[index], ee: datay.data[index],tee:[v,tee], amt: index});
	//data.push( { name: 'tee', value:[v,tee], amt: index});
    isline1 = index < (datax.data.length/2);
    if(isline1){
      line1.push({x:v,y:tee});
    }
    else {
      line2.push({x:v,y:tee});
    }
  });
  const payload = {
    rawdatahex:hexdata,
    line1,
    line2
  };
  console.log(`最终:line1:${line1.length},line2:${line2.length},${JSON.stringify(payload)}`)
  return payload;
}
