const _ =  require('lodash');

const data_x = `55 \
00 00 80 2B 80 39 80 49 80 56 80 65 80 76 80 82 80 94 80 A3 80 B1 80 BE 80 CD 80 DA 80 E9 80 F7 81 05 81 0F 81 1C 81 2A 81 35 81 43 81 4F 81 5C 81 69 81 77 81 83 81 90 81 99 81 A3 81 AD 81 B0 81 B5 81 BB 81 C3 81 CB 81 D1 81 D5 81 D8 81 E0 81 E6 81 EB 81 ED 81 F2 81 F4 81 F7 81 F8 81 FA 81 FC 81 FC 81 FD 81 FB 81 FE 81 FF 82 00 82 00 81 FF 82 00 81 FE 82 00 81 FE 81 FA 81 F1 81 E5 81 DB 81 D2 81 CA 81 BE 81 B2 81 A8 81 99 81 8C 81 81 81 77 81 6A 81 5C 81 4F 81 41 81 2F 81 26 81 18 81 0B 80 FC \ 80 F0 80 DF 80 CE 80 C1 80 B3 80 A4 80 94 80 82 80 72 80 5F 80 50 80 42 80 36 80 25 80 15 80 08 00 01 00 10 00 1F 00 2D 00 3C 00 4E 00 5D 00 6C 00 7B 00 8C 00 99 00 AC 00 B8 00 C7 00 D5 00 E1 00 EF 00 FE 01 0A 01 18 01 25 01 30 01 3E 01 4B 01 59 01 66 01 78 01 82 01 8C 01 95 01 A0 01 AB 01 B1 01 B4 01 B8 01 C0 01 C7 01 CE 01 D3 01 D9 01 DE 01 E2 01 E5 01 EF 01 EF 01 F3 01 F4 01 F4 01 F6 01 F9 01 FA 01 F7 01 FC 01 FB 01 FC 01 FB 02 00 01 FF 01 FE 01 FE 01 FC 01 FC 01 F5 01 ED 01 E3 01 D9 01 D0 \ 01 C5 01 B8 01 AB 01 A2 01 95 01 86 01 79 01 6D 01 61 01 52 01 45 01 38 01 2A 01 1C 01 0F 01 00 00 F4 00 E6 00 D4 00 C4 00 B6 00 A8 00 96 00 86 00 76 00 66 00 54 00 44 00 37 00 28 00 18 00 09 00 00 00 00 80 00 80 2B 80 3A 80 47 80 55 80 67 80 76 80 86 80 92 80 A2 80 AF 80 C0 80 D0 80 DD 80 EB 80 F8 81 03 81 0F 81 1F 81 2B 81 37 81 43 81 50 81 5E 81 6B 81 7B 81 86 81 90 81 9A 81 A3 81 AC 81 B2 81 B8 81 BA 81 C5 81 CA 81 D0 81 D4 81 DC 81 E1 81 E5 81 EC 81 ED 81 F1 81 F5 81 F7 81 F8 81 FA 81 FB \ 81 FA 81 FD 81 FC 82 00 81 FF 82 00 82 00 81 FF 82 00 82 00 82 01 81 FD 81 F9 81 EE 81 E2 81 DB 81 D2 81 C5 81 BD 81 B0 81 A3 81 98 81 8A 81 80 81 73 81 67 81 57 81 4A 81 3E 81 30 81 23 81 18 81 08 80 FA 80 E8 80 DA 80 CC 80 BF 80 AF 80 A0 80 8F 80 7C 80 6C 80 5B 80 4F 80 3E 80 30 80 20 80 11 80 01 00 00 \
`;
const data_y = `EE \
00 00 83 5D 83 AD 83 BB 83 94 83 5C 83 47 83 57 83 46 83 3A 83 28 83 26 83 29 83 01 82 E3 82 C0 82 AF 82 AC 82 9B 82 91 82 8B 82 84 82 89 82 94 82 A8 82 C7 82 C2 82 83 82 16 81 9F 81 74 81 7F 81 23 80 9F 80 8B 80 B4 80 A8 80 84 80 69 80 4B 80 30 80 25 80 22 80 1F 80 20 80 20 80 16 80 00 80 00 80 00 80 00 80 00 00 21 00 29 00 25 00 19 00 13 00 1C 00 27 00 28 00 21 00 20 00 2F 00 48 00 60 00 6D 00 6B 00 66 00 67 00 71 00 7D 00 7F 00 E3 02 C8 03 72 02 A1 02 D5 03 0A 02 B7 02 F3 03 1A 02 F4 03 10 \ 03 2A 03 2E 03 48 03 59 03 60 03 68 03 69 03 86 03 B5 03 CA 03 C8 03 A0 03 6C 03 5D 03 69 03 6D 03 57 03 60 03 84 03 BC 03 F3 04 0C 03 F7 03 DE 03 DE 03 B0 03 8A 03 7D 03 7B 03 7B 03 55 03 29 03 15 03 07 02 FE 02 ED 02 D7 02 D3 02 D6 02 D9 02 E8 03 07 03 31 03 3A 02 F3 02 78 02 0D 01 D5 01 D1 01 85 00 FC 00 C7 01 1F 01 5B 01 23 00 CB 00 B8 00 BC 00 A8 00 88 00 6D 00 6A 00 76 00 83 00 84 00 7E 00 77 00 75 00 75 00 7A 00 7C 00 7C 00 7B 00 79 00 78 00 78 00 7B 00 79 00 77 00 73 00 6C 00 5D 00 1B \ 80 7D 81 52 81 5A 81 F2 82 10 82 38 82 79 82 76 82 79 82 85 82 97 82 B3 82 BA 82 CC 82 CF 82 D4 82 D2 82 EC 83 13 83 1C 83 33 83 44 83 3C 83 3D 83 5D 83 83 83 91 83 8E 83 6C 83 2D 83 1A 83 2E 83 23 83 21 83 3A 83 70 83 B4 83 BF 83 A2 83 6A 83 54 83 5C 83 4A 83 42 83 2B 83 34 83 25 82 FD 82 E5 82 C1 82 BB 82 B1 82 9B 82 94 82 8B 82 8D 82 8A 82 95 82 B0 82 D2 82 CA 82 7C 82 0C 81 9A 81 7C 81 7E 81 13 80 98 80 87 80 A9 80 9F 80 7F 80 62 80 48 80 30 80 25 80 22 80 20 80 20 80 21 80 0B 80 00 80 00 \ 80 00 80 00 80 00 00 1A 00 21 00 1C 00 19 00 1C 00 21 00 20 00 20 00 24 00 2B 00 35 00 48 00 5D 00 68 00 6B 00 6A 00 6C 00 73 00 7B 00 7F 01 34 03 26 03 5D 02 93 02 E5 02 F0 02 BA 03 0A 03 14 02 F6 03 11 03 25 03 3B 03 5A 03 66 03 6A 03 6D 03 6F 03 8B 03 B2 03 C6 03 BF 03 98 03 6F 03 5E 03 6C 03 6F 00 00 \
`;

// const hex_x = _.replace(data_x,' ','|');
// const hex_y = _.replace(data_y,' ','|');
const bufstrx = _.split(data_x,' ').join('');
const bufstry = _.split(data_y,' ').join('');

// const hex_x = _.trim(data_x);
// const hex_y = _.trim(data_y);
console.log(`hex_x===>${bufstrx},\n字节数:${bufstrx.length}`);
console.log(`hex_y===>${bufstry},\n字节数:${bufstrx.length}`);
//---------解析buf-------------
const bufx = Buffer.from(bufstrx, 'hex');
const bufy = Buffer.from(bufstry, 'hex');

// 说明：
// 55开始600个字节组成300个16位二进制数，高位在前低位在后，最高位为1表示负数，取低15位数，这个是正弦波电流数据，取第50个至249个，一个周期；
// EE开始600个字节是采样感应电压数据，高位在前低位在后组成300个16位二进制数，最高位为1表示负数，取低15位数，同样取第50个至249个，一个周期与前面相对应。
// 第一组数据作为横坐标，第二组数据纵坐标，横坐标上升阶段用一种颜色，下降阶段用另一种颜色表示，组成一组闭合曲线。
// 注意：第二组数据纵坐标是积分值，第2个是第1、2两个相加的值，第3个是1、2、3累加的值，负数则减。

const getdata = (buf)=>{
  if(buf.length < 601){
    return {
      result:false,
      msg:'字节数不够'
    };
  }
  if(buf[0] !== 0x55 && buf[0] !== 0xEE){
    return {
      result:false,
      msg:'不是以0x55开头'
    };
  }
  let data = [];//取第50个至249个
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
}

const datax = getdata(bufx);
console.log(`result==>${JSON.stringify(datax)}`);
const datay = getdata(bufy);
console.log(`result==>${JSON.stringify(datay)}`);

let mapvresult = [];
let total = 0;
_.map(datax.data,(v,index)=>{
  total = total+datay.data[index];
  mapvresult.push({
    x:v,
    y:total
  });
});
console.log(`result==>${JSON.stringify(mapvresult)}`);
