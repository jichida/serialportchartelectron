import { createReducer } from 'redux-act';
import {
  getrealtimedata_result,
} from '../actions';


const initial = {
  serialportdata: {
    isgetdata:false,
    currealtimedata:{},
  },
};


const serialportdata = createReducer({
  [getrealtimedata_result]:(state,payload)=>{
    const currealtimedata = {...payload};
    return {...state,currealtimedata,isgetdata:true};
  },
}, initial.serialportdata);

export default serialportdata;
