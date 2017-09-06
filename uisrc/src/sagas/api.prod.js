import {takeEvery,put,fork,call,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getrealtimedata_request,
  getrealtimedata_result,

  querydata_request,
  querydata_result,

  serialport_request,
  serialport_result,

  verifydata_request,
  verifydata_result,

  verifydatasave_request,
  verifydatasave_result

  queryverifydata_request,
  queryverifydata_result
} from '../actions';
import _ from 'lodash';

const {ipcRenderer} = window.require('electron');
// alert(`react api:${!!srvremote}`);
//监听标记事件

const api_call=(typestring,payload)=>{
  return new Promise(resolve => {
    ipcRenderer.once(`${typestring}_result`, (event, arg) => {
      try{
        if(typeof arg === 'string'){
            arg = JSON.parse(arg);
        }
      }
      catch(e){
        console.log(e);
      }
      resolve(arg);
    });
    ipcRenderer.send(`${typestring}`, JSON.stringify(payload));
  });
}


export function* apiflow(){//仅执行一次
  yield takeEvery(`${getrealtimedata_request}`, function*(action) {
    try{
      const result = yield call(api_call,'getrealtimedata',action.payload);
      yield put(getrealtimedata_result(result.payload));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeEvery(`${querydata_request}`, function*(action) {
    try{
      const result = yield call(api_call,'querydata',action.payload);
      yield put(querydata_result(result.payload));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeEvery(`${serialport_request}`, function*(action) {
    try{
      const result = yield call(api_call,'serialport',action.payload);
      yield put(serialport_result(result.payload));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeEvery(`${verifydata_request}`, function*(action) {
    try{
      const result = yield call(api_call,'verifydata',action.payload);
      yield put(verifydata_result(result.payload));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeEvery(`${verifydatasave_request}`, function*(action) {
    try{
      const result = yield call(api_call,'verifydatasave',action.payload);
      yield put(verifydatasave_result(result.payload));
    }
    catch(e){
      console.log(e);
    }
  });
  
  yield takeEvery(`${queryverifydata_request}`, function*(action) {
    try{
      const result = yield call(api_call,'queryverifydata',action.payload);
      yield put(queryverifydata_result(result.payload));
    }
    catch(e){
      console.log(e);
    }
  });

}
