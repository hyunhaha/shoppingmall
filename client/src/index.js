import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleWare(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

