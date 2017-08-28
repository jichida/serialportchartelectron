import {takeEvery,put} from 'redux-saga/effects';
import {
  notify_socket_connected,
} from '../actions';

//获取地理位置信息，封装为promise
export function* socketflow(){//仅执行一次
   yield takeEvery(`${notify_socket_connected}`, function*(action) {
      let {payload:issocketconnected} = action;
      if(issocketconnected){
        //定时发送心跳
      }
    });

}
