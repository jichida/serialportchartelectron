import { createReducer } from 'redux-act';
import {
  getrealtimedata_result,
} from '../actions';


const initial = {
  serialportdata: {
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
}, initial.serialportdata);

export default serialportdata;
