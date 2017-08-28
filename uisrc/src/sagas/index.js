import { fork } from 'redux-saga/effects';
import {apiflow} from './api';
import {createsagacallbackflow} from './sagacallback';

import {wsrecvsagaflow} from './wsrecvsaga';
import {socketflow} from './socketflow';

export default function* rootSaga() {
  try{
    yield fork(createsagacallbackflow);
    yield fork(wsrecvsagaflow);
    yield fork(socketflow);
    yield fork(apiflow);
  }
  catch(e){

  }

}
