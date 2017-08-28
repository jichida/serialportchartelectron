import { put,takeEvery} from 'redux-saga/effects';
import {
  common_err,

  md_login_result,
  login_result,

} from '../actions';
import { push,goBack,go,replace } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import _ from 'lodash';

export function* wsrecvsagaflow() {

  yield takeEvery(`${md_login_result}`, function*(action) {
      let {payload:result} = action;
      yield put(login_result(result));
      if(result.loginsuccess){

      }
  });

  //
  // yield takeEvery(`${common_err}`, function*(action) {
  //       let {payload:result} = action;
  //
  //       yield put(set_weui({
  //         toast:{
  //         text:result.errmsg,
  //         show: true,
  //         type:'warning'
  //       }}));
  // });


}
