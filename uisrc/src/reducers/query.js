import { createReducer } from 'redux-act';
import {
  querydata_request,
  querydata_result,
} from '../actions';


const initial = {
  query: {
    total:0,
    defaultCurrent:1,
    current:1,
    pageSize:10,
    datalist:[]
  },
};

//querydata_request:{query:{},options:{page:page,limit:pageSize}}
const querydata = createReducer({
  [querydata_result]:(state,payload)=>{
    const {page:current,limit:pageSize,total,docs,pages} = payload;
    const datalist = {...docs};
    return {...state,total,current,pageSize,datalist};
  },
}, initial.query);

export default querydata;
