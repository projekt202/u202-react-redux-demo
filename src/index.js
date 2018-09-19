import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducer } from './store.js';

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
