import { createAction } from 'redux-act';

//获取数据请求
export const getrealtimedata_request = createAction('getrealtimedata_request');
export const getrealtimedata_result = createAction('getrealtimedata_result');

//查询数据
export const querydata_request = createAction('querydata_request');
export const querydata_result = createAction('querydata_result');

//保持心跳
export const keepalive_request  = createAction('keepalive_request');
export const keepalive_result  = createAction('keepalive_result');
