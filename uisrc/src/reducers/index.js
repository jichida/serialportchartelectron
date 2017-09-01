import { combineReducers } from 'redux';
import serialportdata from './serialportdata';
import querydata from './query';

export default combineReducers({
  serialportdata,
  querydata
});
