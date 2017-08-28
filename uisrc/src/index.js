import React from 'react';
import ReactDOM from 'react-dom';
import Root from './env/root';
import store,{sagaMiddleware} from './env/store';
import rootSaga from './sagas';

// const remote = require('electron').remote;
// alert(`remote:${!!remote}`);

sagaMiddleware.run(rootSaga);
ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
