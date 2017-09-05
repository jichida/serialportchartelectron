import {takeEvery,put,fork,call,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getrealtimedata_request,
  getrealtimedata_result,

  querydata_request,
  querydata_result,

  serialport_request,
  serialport_result

} from '../actions';
import _ from 'lodash';

const {ipcRenderer} = window.require('electron');
// alert(`react api:${!!srvremote}`);
//监听标记事件
const api_getrealtimedata_request = ()=>{
  return new Promise(resolve => {
    ipcRenderer.once('getrealtimedata_result', (event, arg) => {
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
    ipcRenderer.send('getrealtimedata', '');
  });
}

const api_queryrealtimedata_request =(query,option)=>{
  return new Promise(resolve => {
    ipcRenderer.once('queryrealtimedata_result', (event, arg) => {
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
    ipcRenderer.send('queryrealtimedata', JSON.stringify({query,option}));
  });
}

const api_serialport_request =(open)=>{
  return new Promise(resolve => {
    ipcRenderer.once('serialport_result', (event, arg) => {
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
    ipcRenderer.send('serialport', JSON.stringify({open}));
  });
}

export function* apiflow(){//仅执行一次
  yield takeEvery(`${getrealtimedata_request}`, function*(action) {
    try{
      const result = yield call(api_getrealtimedata_request);
      const {payload} = result;
      yield put(getrealtimedata_result(payload));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeEvery(`${querydata_request}`, function*(action) {
    try{
      const {payload:{query,options}} = action;
      const result = yield call(api_queryrealtimedata_request,query,options);
      const {payload} = result;
      yield put(querydata_result(payload));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeEvery(`${serialport_request}`, function*(action) {
    try{
      const {payload:{open}} = action;
      const result = yield call(api_serialport_request,open);
      const {payload} = result;
      yield put(serialport_result(payload));
    }
    catch(e){
      console.log(e);
    }

  });


}
