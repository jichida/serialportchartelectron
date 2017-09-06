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

export const ui_changedate = createAction('ui_changedate');
export const ui_checkonly = createAction('ui_checkonly');


export const ui_clearchart = createAction('ui_clearchart');

export const serialport_request = createAction('serialport_request');
export const serialport_result = createAction('serialport_result');

export const verifydata_request = createAction('verifydata_request');
export const verifydata_result = createAction('verifydata_result');

export const verifydatasave_request = createAction('verifydatasave_request');
export const verifydatasave_result = createAction('verifydatasave_result');

export const queryverifydata_request = createAction('queryverifydata_request');
export const queryverifydata_result = createAction('queryverifydata_result');
