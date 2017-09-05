import { createReducer } from 'redux-act';
import {
  getrealtimedata_result,
  ui_clearchart,
  serialport_result
} from '../actions';


const initial = {
  serialportdata: {
    isserialportopen:false,
    currealtimedatalist:[],
  },
};


const serialportdata = createReducer({
  [getrealtimedata_result]:(state,payload)=>{
    const currealtimedata = {...payload};
    const currealtimedatalist = [...state.currealtimedatalist];
    currealtimedatalist.push(currealtimedata);
    return {...state,currealtimedatalist};
  },
  [ui_clearchart]:(state,payload)=>{
    let currealtimedatalist = [];
    return {...state,currealtimedatalist};
  },
  [serialport_result]:(state,payload)=>{
    let isserialportopen = payload;
    return {...state,isserialportopen};
  },
}, initial.serialportdata);

export default serialportdata;
