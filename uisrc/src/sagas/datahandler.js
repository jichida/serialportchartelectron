import {
    common_err,

    getrealtimedata_request,
    getrealtimedata_result,

    querydata_request,
    querydata_result,

    keepalive_request,
    keepalive_result,

  } from '../actions';


//接收的对应关系
let recvmessagetoresultpair = {
  'getrealtimedata_result':getrealtimedata_result,
  'querydata_result':querydata_result,

  'keepalive_result':keepalive_result,

  'common_err':common_err,
};

//非验证发送接口
let sendmessagefnsz = {
  'getrealtimedata_request':`${getrealtimedata_request}`,
  'querydata_request':`${querydata_request}`,
  'keepalive_request':`${keepalive_request}`,

};

//验证发送接口
let sendmessageauthfnsz = {
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
