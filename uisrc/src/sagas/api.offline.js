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

export function* apiflow(){//仅执行一次
  yield takeEvery(`${getrealtimedata_request}`, function*(action) {

  });

  yield takeEvery(`${querydata_request}`, function*(action) {

  });

  yield takeEvery(`${keepalive_request}`, function*(action) {

  });


}
