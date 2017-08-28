import { createAction } from 'redux-act';
export const notify_socket_connected = createAction('notify_socket_connected');

export const login_request = createAction('login_request');
export const login_result = createAction('login_result');
export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');
export const common_err = createAction('common_err');
export const md_login_result = createAction('md_login_result');
