import React from 'react';
import { render} from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';


import App from './components/App';
import ShoppingListApp from './reducers';

import './static/index.css'

import registerServiceWorker from './utils/registerServiceWorker';

const createStoreMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);

render(
    <Provider store={
        createStoreMiddleware(
            ShoppingListApp,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
