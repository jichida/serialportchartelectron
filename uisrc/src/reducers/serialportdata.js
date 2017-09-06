import { createReducer } from 'redux-act';
import {
  getrealtimedata_result,
  ui_clearchart,
  serialport_result,
  verifydata_request,
  verifydata_result,
  verifydatasave_result,
} from '../actions';
import _ from 'lodash';

const initial = {
  serialportdata: {
    isserialportopen:false,
    currealtimedatalist:[],
    isverifydata:false,
    verifydataflag:0,
    verifydata:{}
  },
};


const serialportdata = createReducer({
  [getrealtimedata_result]:(state,payload)=>{
    const currealtimedata = {...payload};
    const currealtimedatalist = [...state.currealtimedatalist];
    currealtimedatalist.push(currealtimedata);
    return {...state,currealtimedatalist,isverifydata:false};
  },
  [ui_clearchart]:(state,payload)=>{
    let currealtimedatalist = [];
    return {...state,currealtimedatalist};
  },
  [serialport_result]:(state,payload)=>{
    let isserialportopen = payload;
    return {...state,isserialportopen};
  },
  [verifydata_request]:(state,payload)=>{
    const {verifydataflag} = payload;
    return {...state,isverifydata:true,verifydataflag};
  },
  [verifydata_result]:(state,payload)=>{
    let verifydata = {...state.verifydata};
    verifydata[payload.verifydataflag] = payload;
    return {...state,verifydata};
  },
  [verifydatasave_result]:(state,payload)=>{
    let list = {...payload};
    let verifydata = {};
    _.map(list,(data)=>{
      verifydata[data.verifydataflag] = data;
    });
    return {...state,verifydata};
  },
}, initial.serialportdata);

export default serialportdata;
