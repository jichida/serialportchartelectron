import _ from 'lodash';
const parsedata = (hexdata)=>{
  const bufstrx = hexdata.substring(0,1202);
  const bufstry = hexdata.substring(1202,2404);
  //2404
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
    let data = [];
    for(let i = 0 ;i < 300 ;i++){
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
  const datay = getdata(bufy);

  const payload = {
    rawdata_hex:hexdata,
    rawdata_55:datax.data,
    rawdata_ee:datay.data,
  };
  console.log(`最终:payload:${JSON.stringify(payload)}`);
  return payload;
}

export {parsedata};
