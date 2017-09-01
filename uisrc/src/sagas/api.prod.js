import {takeEvery,put,fork,call,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getrealtimedata_request,
  getrealtimedata_result,

  querydata_request,
  querydata_result,

  keepalive_request,
  keepalive_result,

} from '../actions';
import _ from 'lodash';

const remote = window.require('electron').remote;
// alert(`react remote:${!!remote}`);
const srvremote = remote.getGlobal('api');
// alert(`react api:${!!srvremote}`);
//监听标记事件
const api_getrealtimedata_request = ()=>{
  return new Promise(resolve => {
    srvremote.getrealtimedata((result)=>{
      resolve(result);
    })
  });
}

const api_queryrealtimedata_request =(query,option,callback)=>{
  return new Promise(resolve => {
    srvremote.queryrealtimedata(query,option,(result)=>{
      resolve(result);
    })
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
      const result = yield call(api_queryrealtimedata_request);
      const {payload} = result;
      alert(JSON.stringify(payload));
      yield put(querydata_result(payload));
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeEvery(`${keepalive_request}`, function*(action) {

  });


}
